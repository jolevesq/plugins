"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = require("./template");
var CustomPrint = /** @class */ (function () {
    function CustomPrint() {
    }
    CustomPrint.prototype.init = function (api) {
        this.api = api;
        // get template path
        this.config = this._RV.getConfig('plugins').customPrint;
        // add side menu button
        this.button = this.api.mapI.addPluginButton(CustomPrint.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());
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
    };
    CustomPrint.prototype.onMenuItemClick = function () {
        var _this = this;
        return function () {
            new Promise(function (resolve) {
                $.ajax({
                    method: 'GET',
                    url: _this.config.template,
                    cache: false,
                    dataType: 'html'
                }).then(function (html) {
                    resolve(html);
                });
            }).then(function (html) { return _this.createForm(html); });
        };
    };
    CustomPrint.prototype.createForm = function (html) {
        // convert string to list of nodes and get aray of controls
        var htmlNodes = new DOMParser().parseFromString(html, 'text/html').body.childNodes;
        var controls = $(htmlNodes).find('[data-type="controls"]').toArray();
        // loop trought controls to create an array of input for the form
        var items = [];
        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {
            var control = controls_1[_i];
            console.log('test');
            var item = {
                label: control.getAttribute('data-label'),
                type: control.getAttribute('data-cast')
            };
            items.push(item);
        }
        // set the angular from and controller
        this.setAngular(items, htmlNodes);
    };
    CustomPrint.prototype.setAngular = function (items, htmlNodes) {
        var that = this;
        this.api.agControllerRegister('printCtrl', function () {
            var _this = this;
            this.controls = items;
            this.print = function () {
                // set values from the form
                that.panelView.body = $(that.setValues(_this.controls, htmlNodes)).html();
                // set values for canvas
                that.setCanvas().then(function (canvas) {
                    for (var _i = 0, _a = canvas; _i < _a.length; _i++) {
                        var canva = _a[_i];
                        $(that.panelView.body).find("[data-type=\"" + canva.type + "\"]").append(canva.value);
                    }
                    that.panelView.open();
                });
            };
        });
        // add print controls
        this.panelForm.body = template_1.PRINT_FORM_TEMPLATE;
        this.panelForm.open();
        // toggle side nav
        this._RV.toggleSideNav('close');
    };
    CustomPrint.prototype.setValues = function (items, htmlNodes) {
        var controls = $(htmlNodes).find('[data-type="controls"]').toArray();
        for (var i in controls) {
            controls[i].innerHTML = items[i].value;
        }
        return htmlNodes;
    };
    CustomPrint.prototype.setCanvas = function () {
        var _this = this;
        return new Promise(function (resolve) {
            // call the export to generate all the canvas
            _this.api.export();
            // wait for the canvas
            var inter = setInterval(function () {
                // loop trought the canvas element and add needed one
                if ($('.rv-export canvas').length !== 0) {
                    clearInterval(inter);
                    var canvasMap = _this.cloneCanvas($('.rv-export-section canvas')[0]);
                    var canvasScale = _this.cloneCanvas($('.rv-export-section canvas')[1]);
                    var canvasLegend = _this.cloneCanvas($('.rv-export-section canvas')[2]);
                    var canvasFootNote = _this.cloneCanvas($('.rv-export-section canvas')[3]);
                    var canvas = [{ type: 'map', value: canvasMap }, { type: 'note', value: canvasFootNote }];
                    resolve(canvas);
                }
            }, 5000);
        });
    };
    CustomPrint.prototype.cloneCanvas = function (oldCanvas) {
        // create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');
        // set dimensions
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        // apply the old canvas to the new one
        context.drawImage(oldCanvas, 0, 0);
        // return the new canvas
        return newCanvas;
    };
    CustomPrint.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.api.$compile(temp);
        return temp;
    };
    return CustomPrint;
}());
CustomPrint.prototype.panelOptionsForm = { bottom: '0em', width: '400px', top: '50px' };
CustomPrint.prototype.panelOptionsView = { bottom: '0em', right: '50px', top: '50px', left: '450px' };
CustomPrint.prototype.translations = {
    'en-CA': {
        title: 'Custom print'
    },
    'fr-CA': {
        title: 'Impression Personnalisée'
    }
};
window.customPrint = CustomPrint;
