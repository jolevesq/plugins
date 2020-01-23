const FileSaver = require('file-saver');
import * as jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';
import * as html2canvas from "html2canvas"

import { PRINT_FORM_TEMPLATE, PRINT_BUTTON } from './template';

// test to create observable so plugin user can subscribe to plugin events like for the viewer api
import { Subject } from 'rxjs';

export class CanvasObs {
    private _canvaConverted = new Subject();

    setCanvas(canvas) {
        this._canvaConverted.next(canvas);
    }

    getCanvas = this._canvaConverted.asObservable();
}
(<any>window).canvasObs = new CanvasObs();




class CustomPrint {
    init(api: any) {
        this.api = api;
    
        // get template path
        this.config = this._RV.getConfig('plugins').customPrint;

        // add side menu button
        this.button = this.api.mapI.addPluginButton(
            CustomPrint.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick()
        );
        // TODO: remove toggle side nav
        this._RV.toggleSideNav('open');

        // create panel for form
        this.panelForm = this.api.panels.create('customPrintForm');
        this.panelForm.element.css(CustomPrint.prototype.panelOptionsForm);

        // create panel for print
        this.panelView = this.api.panels.create('customPrintView');
        this.panelView.element.css(CustomPrint.prototype.panelOptionsView);
        this.panelView.header.title = CustomPrint.prototype.translations[this._RV.getCurrentLang()].title;
        this.panelView.header.closeButton;
    }

    onMenuItemClick() {
        return () => {
            new Promise(resolve => {
                $.ajax({
                    method: 'GET',
                    url: this.config.template,
                    cache: false,
                    dataType: 'html'
                }).then(html => {
                    resolve(html);
                });
            }).then(html => this.createForm(<string>html));
        }
    }

    createForm(html: string) {
        // convert string to list of nodes and get aray of controls
        const htmlNodes = new DOMParser().parseFromString(html, 'text/html').body.childNodes
        const controls = $(htmlNodes).find('[data-type="controls"]').toArray();

        // loop trought controls to create an array of input for the form
        const items = []
        for (let control of controls) {
            let item = {
                label: (<any>control).getAttribute('data-label'),
                type: (<any>control).getAttribute('data-cast')
            };

            items.push(item);
        }

        // set the angular form and controller
        this.setAngular(items, htmlNodes, (<any>$(htmlNodes)).toArray()[0].style);
    }

    setAngular(items: object[], htmlNodes: NodeListOf<ChildNode>, style: CSSStyleDeclaration) {
        const that = this;
        this.api.agControllerRegister('printFormCtrl', function () {
            this.controls = items;
            
            this.print = () => {
                // set values, style and export button for panel view
                that.panelView.body = $(that.setValues(this.controls, htmlNodes)).html();
                that.panelView.body[0].style = style.cssText;
                that.panelView.header.controls[0].prepend(that.compileTemplate(PRINT_BUTTON)[0]);

                // set values for canvas
                that.setCanvas().then(canvas => {
                    for (let canva of <Object[]>canvas) {
                        $(that.panelView.body).find(`[data-type="${(<any>canva).type}"]`).append((<any>canva).value)
                    }
                    that.panelView.open();
                });
            };
        });

        this.api.agControllerRegister('printExportCtrl', function () {
            this.controls = items;
            
            this.print = () => {
                that.export();
            };
        });

        // add print controls
        this.panelForm.body = PRINT_FORM_TEMPLATE;
        this.panelForm.open();

        // toggle side nav
        this._RV.toggleSideNav('close');
    }

    setValues(items, htmlNodes) {
        const controls = $(htmlNodes).find('[data-type="controls"]').toArray();
        for (let i in controls) {
            (<any>controls)[i].innerHTML = items[i].value;
        }

        // if image is provided for north arrow, use it and rotate
        const arrow = $(htmlNodes).find('[data-type="arrow"] img');
        if (typeof arrow !== 'undefined') {
            arrow.css('transform', `rotate(${this.api.fgpMapObj.getNorthArrowAngle() - 180}deg)`);
        }

        return htmlNodes;
    }

    setCanvas() {
        return  new Promise(resolve => {
            // call the export to generate all the canvas
            this.api.export();

            // wait for the canvas
            const inter = setInterval(() => {
                // loop trought the canvas element and add needed one
                if ($('.rv-export canvas').length !== 0) {
                    clearInterval(inter);

                    const canvas: Object[] = [];
                    // map, scale, legend, note
                    if ($('[data-type="map"]').length !== 0) {
                        canvas.push({ type: 'map',
                            value: this.cloneCanvas($('.rv-export-section canvas')[0], $('[data-type="map"]')[0].getAttribute('data-style'))
                        });
                    }

                    if ($('[data-type="scale"]').length !== 0) {
                        canvas.push({ type: 'scale',
                            value: this.cloneCanvas($('.rv-export-section canvas')[1], $('[data-type="scale"]')[0].getAttribute('data-style'))
                        });
                    }

                    // trigger observable
                    (<any>window).canvasObs.setCanvas(canvas);

                    resolve(canvas);

                    // close export dialog box
                    $('.rv-export md-dialog-actions button')[1].click();
                }
            }, 5000);
        });
    }

    cloneCanvas(oldCanvas, style) {
        // create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');
    
        // set dimensions
        const dimension = style.split(':');
        const ratio = oldCanvas.height / oldCanvas.width;
        newCanvas.width = (dimension[0] === 'width') ? parseInt(dimension[1], 10) : parseInt(dimension[1], 10) * (1/ratio);
        newCanvas.height = (dimension[0] === 'height') ? parseInt(dimension[1], 10) : parseInt(dimension[1], 10) * ratio;

        // apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0, newCanvas.width, newCanvas.height);

        // return the new canvas
        return newCanvas;
    }

    export() {
        let canvas = null;
        canvas = this.createCanvas(1500, 1000);

        const exportGraphics = $(this.panelView.body).find('[data-type="controls"]').toArray()
        //const outCanva = this.mergeCanvases([canvas, ...exportGraphics]);

        try {

            (html2canvas as any)(document.querySelector('[data-type="map"]')).then(canvas => {

                // this.panelView.body.prepend(canvas)

                var imgData = canvas.toDataURL('image/png');   
                
                let img = this.setDPI(canvas, 96);

                var doc = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'legal',
                    putOnlyUsedFonts:true,
                    floatPrecision: 16 // or "smart", default is 16
                   });

                //    https://rawgit.com/MrRio/jsPDF/master/docs/module-addImage.html#~addImage
                doc.addImage(img, 'JPEG',10, 10, img.width, img.height);

                //var doc = new jsPDF('l', 'px', [1000,500])
                //doc.addImage(canvas, 'PNG', 0 ,0, 980, 40)
                doc.save('a4.pdf')

            });

            

            // https://github.com/fgpv-vpgf/fgpv-vpgf/issues/3184
            // IE 10+ and Edge have their own `toBlob` implementation called `msToblob` ...
            // if (outCanva.msToBlob) {
            //     // ... and it's synchronous!
            //     FileSaver.saveAs(canvas.msToBlob(), `${fileName}.${self.fileType}`);
            // } else {
            //     outCanva.toBlob(blob => {
            //         FileSaver.saveAs(blob, `${fileName}.${self.fileType}`);
            //     });
            // }
        } catch (error) {
            console.error(error);
        }
    }

    setDPI(canvas, dpi) {
        // Set up CSS size.
        canvas.style.width = canvas.style.width || canvas.width + 'px';
        canvas.style.height = canvas.style.height || canvas.height + 'px';
    
        // Get size information.
        var scaleFactor = dpi / 96;
        var width = parseFloat(canvas.style.width);
        var height = parseFloat(canvas.style.height);
    
        // Backup the canvas contents.
        var oldScale = canvas.width / width;
        var backupScale = scaleFactor / oldScale;
        var backup = canvas.cloneNode(false);
        backup.getContext('2d').drawImage(canvas, 0, 0);
    
        // Resize the canvas.
        var ctx = canvas.getContext('2d');
        canvas.width = Math.ceil(width * scaleFactor);
        canvas.height = Math.ceil(height * scaleFactor);
    
        // Redraw the canvas image and scale future draws.
        ctx.setTransform(backupScale, 0, 0, backupScale, 0, 0);
        ctx.drawImage(backup, 0, 0);
        ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0);

        return canvas;
    }

        /**
     * Creates a canvas DOM node;
     * @function createCanvas
     * @param {Number} width target width with of the canvas
     * @param {Number} height target height with of the canvas
     * @param {String} backgroundColor [optional = null] if specified, the canvas is coloured with it
     * @return {Object} canvas DOM node
     */
    createCanvas(width, height, backgroundColor = null) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        if (backgroundColor !== null) {
            const context = canvas.getContext('2d');

            // paint it white
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, width, height);
        }

        return canvas;
    }

    /**
     * Merges canvases together and returns the result.
     *
     * @function mergeCanvases
     * @param {Array} canvases an array of canvases to mergeCanvases; the first item acts as a base on which all other canvases are rendered in order
     * @param {Array} offsets [optional = []] must be of n-1 length where n is the number of canvases; provides x and y offsets when merging canvases on the base canvas
     * @return {Object} merged canvas object
     */
    mergeCanvases(canvases, offsets = []) {
        const baseCanvas = canvases.shift();
        const baseContext = baseCanvas.getContext('2d');

        canvases.forEach((canvas, index) => {
            const offset = offsets[index] || [0, 0];
            baseContext.drawImage(canvas, ...offset);
        });

        return baseCanvas;
    }

    compileTemplate(template: string): JQuery<HTMLElement> {
        let temp = $(template);
        this.api.$compile(temp);
        return temp;
    }
}

CustomPrint.prototype.panelOptionsForm = { bottom: '0em', width: '400px', top: '50px' };
CustomPrint.prototype.panelOptionsView = { bottom: '0em', right: '50px', top: '50px', left: '450px' };

interface CustomPrint {
    api: any;
    translations: any;
    _RV: any;
    panelView: any;
    panelForm: any;
    button: any;
    config: any;
    panelOptionsForm: any;
    panelOptionsView: any;
    template: any;
    obs: any;
}

CustomPrint.prototype.translations = {
    'en-CA': {
        title: 'Custom print',
        export: 'Export'
    },

    'fr-CA': {
        title: 'Impression Personnalisée',
        export: 'Exporter'
    }
};

(<any>window).customPrint = CustomPrint;
