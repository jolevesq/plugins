"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("./templates");
var toolbar_1 = require("./toolbar");
var vanilla_picker_1 = require("vanilla-picker");
var FileSaver = require('file-saver');
var Debounce = require('debounce');
var PanelManager = /** @class */ (function () {
    function PanelManager(mapApi, config) {
        this.mapApi = mapApi;
        // create ui then instanciate the ESRI toolbar
        this.drawToolbar = new toolbar_1.DrawToolbar(mapApi, config);
        this.makeControls();
    }
    PanelManager.prototype.makeControls = function () {
        var _this = this;
        this.angularControls();
        // add draw controls
        $('rv-mapnav').append(this.compileTemplate(templates_1.MAPNAV_DRAW_TOOLBAR_TEMPLATE));
        // add colour picker
        // use timeout because if not, the value to create id is not finish compiled yet.
        setTimeout(function () {
            var pick = new vanilla_picker_1.default({
                parent: $('#drawiconpicker').closest('.md-icon-button')[0],
                color: 'red',
                popup: 'left'
            });
            $('#pathpicker')[0].style.color = 'red';
            // update the color selector and toolbar
            var that = _this;
            pick.onChange = function (color) {
                that.drawToolbar.activeColor = color.rgba;
                // get color, set opacity to 1 even if different so it is visible on the toolbar
                var colorNew = color.rgbaString.substring(0, color.rgbaString.lastIndexOf(',')) + ",1)";
                $('#pathpicker')[0].style.color = colorNew;
            };
        }, 0);
    };
    PanelManager.prototype.angularControls = function () {
        var that = this;
        this.mapApi.agControllerRegister('DrawToolbarCtrl', function () {
            var _this = this;
            this.controls = {
                picker: {
                    name: 'picker',
                    label: 'plugins.draw.draw.picker',
                    icon: 'M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
                    tooltip: 'plugins.draw.draw.picker',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.picker); }
                },
                point: {
                    name: 'point',
                    label: 'plugins.draw.draw.point',
                    icon: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z',
                    tooltip: 'plugins.draw.draw.point',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.point); },
                    selected: function () { return _this.controls.point.active; },
                    action: function () {
                        that.setActive(_this.controls, 'point');
                    }
                },
                polyline: {
                    name: 'polyline',
                    label: 'plugins.draw.draw.line',
                    icon: 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z',
                    tooltip: 'plugins.draw.draw.line',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.polyline); },
                    selected: function () { return _this.controls.polyline.active; },
                    action: function () {
                        that.setActive(_this.controls, 'polyline');
                    }
                },
                polygon: {
                    name: 'polygon',
                    label: 'plugins.draw.draw.polygon',
                    icon: 'M2 22h20V2z',
                    tooltip: 'plugins.draw.draw.polygon',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.polygon); },
                    selected: function () { return _this.controls.polygon.active; },
                    action: function () {
                        that.setActive(_this.controls, 'polygon');
                    }
                },
                measure: {
                    name: 'measure',
                    label: 'plugins.draw.draw.measure',
                    iconShow: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
                    iconHide: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z',
                    tooltip: 'plugins.draw.draw.measure',
                    active: true,
                    createIcon: function () { that.createIcon(_this.controls.measure, 'iconShow'); },
                    action: function () {
                        that.measure(_this.controls.measure, that);
                    }
                },
                extent: {
                    name: 'extent',
                    label: 'plugins.draw.draw.extent',
                    icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z',
                    tooltip: 'plugins.draw.draw.extent',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.extent); },
                    selected: function () { return _this.controls.extent.active; },
                    action: function () {
                        that.setActive(_this.controls, 'extent');
                    }
                },
                write: {
                    name: 'write',
                    label: 'plugins.draw.draw.write',
                    icon: 'M19 9h-4V3H9v6H5l7 7 7-7z M5 18v2h14v-2H5z',
                    tooltip: 'plugins.draw.draw.write',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.write); },
                    action: function () {
                        that.setActive(_this.controls, 'write');
                        // save the file. Some browsers like IE and Edge doesn't support File constructor, use blob
                        // https://stackoverflow.com/questions/39266801/saving-file-on-ie11-with-filesaver
                        var file = new Blob([that.drawToolbar.exportGraphics()], { type: 'application/json' });
                        FileSaver.saveAs(file, "viewer.fgpv");
                    }
                },
                read: {
                    name: 'read',
                    label: 'plugins.draw.draw.read',
                    icon: 'M9 16h6v-6h4l-7-7-7 7h4z M5 18v2h14v-2H5z',
                    tooltip: 'plugins.draw.draw.read',
                    active: false,
                    createIcon: function () { that.createIcon(_this.controls.read); },
                    action: function () {
                        that.setActive(_this.controls, 'read');
                        $(document.getElementById('rvUploadGraphics'))[0].click();
                        $('#rvUploadGraphics').change(function (event) {
                            $('#rvUploadGraphics').off('change');
                            var reader = new FileReader();
                            reader.addEventListener('load', function (event) {
                                that.drawToolbar.importGraphics(JSON.parse(event.target.result));
                            });
                            reader.readAsText(event.target.files[0]);
                            $('#rvUploadGraphics').val('');
                        });
                    }
                }
            };
            // trap esc key when using tools
            that.mapApi.mapDiv.on('keydown', { controls: this.controls, draw: that.drawToolbar }, function (event) {
                var tool = event.data.draw.activeTool;
                if (window.event.which === 27 && tool !== '') { // esc
                    // set focus on the active tool, remove the selection class and deactivate the tool
                    var element = document.getElementsByClassName("rv-draw-" + tool + "-button")[0];
                    element.rvFocus();
                    element.classList.remove('rv-control-active');
                    // this will set the tool inactive
                    that.setActive(event.data.controls, tool);
                }
            });
        });
    };
    PanelManager.prototype.createIcon = function (control, icon) {
        // use timeout because if not, the value to create id is not finish compiled yet.
        var btnIcon = typeof icon !== 'undefined' ? control[icon] : control.icon;
        setTimeout(function () { document.getElementById("path" + control.name).setAttribute('d', btnIcon); }, 0);
    };
    PanelManager.prototype.setActive = function (controls, name) {
        // set all controls to false then enable/disable the needed one
        var enable = !controls[name].active;
        Object.keys(controls).forEach(function (k) { return controls[k].active = false; });
        controls[name].active = enable;
        this.mapApi.mapDiv.off('keydown', '.rv-esri-map', this.keyDownHandler);
        if (typeof this._mousemoveHandler !== 'undefined') {
            this._mousemoveHandler.remove();
        }
        ;
        if (typeof this._mouseclickHandler !== 'undefined') {
            this._mouseclickHandler.remove();
        }
        ;
        this.drawToolbar.mapPoints = [];
        // activate the keyboard event if an active tool is selected
        // if needed we can look for rv-keyboard on mapDiv to know if crosshair is enable
        if (enable) {
            // set focus on the map and add the keydown event
            document.getElementsByClassName('rv-esri-map')[0].rvFocus();
            var jQwindow = $(window);
            this.mapApi.mapDiv.on('keydown', '.rv-esri-map', { draw: this.drawToolbar, jQwindow: jQwindow, name: name }, this.keyDownHandler);
            if (name === 'polyline') {
                var that_1 = this;
                this._mousemoveHandler = this.mapApi.esriMap.on('mouse-move', Debounce(function (event) { that_1.mouseHandler(event, that_1.drawToolbar); }, 50));
                this._mouseclickHandler = this.mapApi.esriMap.on('click', function (event) { that_1.mouseHandler(event, that_1.drawToolbar); });
            }
        }
        // activate the right tool from the ESRI draw toolbar
        this.drawToolbar.activeTool = enable ? controls[name].name : '';
    };
    PanelManager.prototype.keyDownHandler = function (event) {
        var _a;
        // get the crosshairs dimensions if not yet defined
        var targetElement = $('.rv-target')[0];
        var targetElmWidth;
        var targetElmHeight;
        _a = [targetElement.offsetWidth, targetElement.offsetHeight], targetElmWidth = _a[0], targetElmHeight = _a[1];
        // get position of the crosshairs center point relative to the visible viewport
        var _b = $(targetElement).offset(), x = _b.left, y = _b.top;
        x += -event.data.jQwindow.scrollLeft() + targetElmWidth / 2;
        y += -event.data.jQwindow.scrollTop() + targetElmHeight / 2;
        if (event.which === 13 && event.data.name === 'extent') { // enter extent starting point
            event.data.draw.setExtentPoints([x, y], false);
            event.data.draw.geometryLength = event.data.draw.geometryLength + 1;
        }
        else if (event.which === 32 && event.data.name === 'extent' && event.data.draw.geometryLength > 0) { // enter extent stopping point
            event.data.draw.setExtentPoints([x, y], true);
        }
        else if (event.which === 13 ||
            (event.which === 32 && event.data.name === 'polyline' && event.data.draw.geometryLength > 1) ||
            (event.which === 32 && event.data.name === 'polygon' && event.data.draw.geometryLength > 2)) { // handle add geometry
            var mouse = (event.which === 13) ? 'click' : 'dbl-click';
            event.data.draw.simulateClick([x, y], mouse);
            // keep track of number of point inside the geometry
            event.data.draw.geometryLength = (mouse === 'click') ? event.data.draw.geometryLength + 1 : 0;
        }
    };
    PanelManager.prototype.mouseHandler = function (event, drawToolbar) {
        if (event.type === 'mousemove' && typeof drawToolbar.mapPoints[0] !== 'undefined') {
            drawToolbar.mapPoints = [drawToolbar.mapPoints[0], event.mapPoint];
        }
        else if (event.type === 'click') {
            drawToolbar.mapPoints = [event.mapPoint];
        }
    };
    PanelManager.prototype.measure = function (measure, that) {
        measure.active = !measure.active;
        var icon = measure.active ? 'iconHide' : 'iconShow';
        that.createIcon(measure, icon);
        if (icon === 'iconHide') {
            $('#graphicsRvColl_layer text').addClass('rv-draw-text-hide');
            $('#graphicsRvColl_layer rect').addClass('rv-draw-text-hide');
        }
        else {
            $('#graphicsRvColl_layer text').removeClass('rv-draw-text-hide');
            $('#graphicsRvColl_layer rect').removeClass('rv-draw-text-hide');
            that.drawToolbar.createBackground();
        }
    };
    PanelManager.prototype.compileTemplate = function (template) {
        var temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    };
    return PanelManager;
}());
exports.PanelManager = PanelManager;
