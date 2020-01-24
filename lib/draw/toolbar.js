"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiLine_1 = require("./MultiLine");
/**
 * Creates and manages draw toolbar.
 */
var DrawToolbar = /** @class */ (function () {
    function DrawToolbar(mapApi, config) {
        var _this = this;
        this._activeTool = '';
        this._activeColor = [255, 0, 0, 1];
        this._mapPoint = [];
        this._geomLength = 0;
        this._extentPoints = [];
        this._mapApi = mapApi;
        this._config = config;
        this._identifyMode = this._mapApi.layersObj._identifyMode;
        // add needed dependencies
        var myBundlePromise = RAMP.GAPI.esriLoadApiClasses([
            ['esri/toolbars/draw', 'esriTool'],
            ['esri/graphic', 'Graphic'],
            ['esri/symbols/TextSymbol', 'TextSymbol'],
            ['esri/symbols/SimpleMarkerSymbol', 'SimpleMarkerSymbol'],
            ['esri/symbols/SimpleLineSymbol', 'SimpleLineSymbol'],
            ['esri/symbols/SimpleFillSymbol', 'SimpleFillSymbol'],
            ['esri/geometry/ScreenPoint', 'ScreenPoint'],
            ['dojo/i18n!esri/nls/jsapi', 'i18n'],
            ['esri/tasks/GeometryService', 'GeomService'],
            ['esri/tasks/DensifyParameters', 'DensifyParams'],
            ['esri/tasks/DistanceParameters', 'DistanceParams'],
            ['esri/tasks/LengthsParameters', 'LengthParams'],
            ['esri/tasks/AreasAndLengthsParameters', 'AreaParams'],
            ['esri/geometry/Point', 'Point'],
            ['esri/geometry/Polygon', 'Polygon']
        ]);
        var that = this;
        myBundlePromise.then(function (myBundle) {
            _this.initToolbar(myBundle, _this._config);
            var defaults = {
                'en-CA': {
                    addPoint: 'Click to add a point',
                    complete: 'Double-click to finish',
                    finish: 'Double-click to finish',
                    freehand: 'Press down to start and let go to finish',
                    resume: 'Click to continue drawing',
                    start: 'Click to start drawing'
                },
                'fr-CA': {
                    addPoint: 'Cliquez pour ajouter un point',
                    complete: 'Double-cliquez pour finir',
                    finish: 'Double-cliquez pour finir',
                    freehand: 'Appuyez pour commencer et laissez aller pour finir',
                    resume: 'Cliquez pour continuer à dessiner',
                    start: 'Cliquez pour commencer à dessiner'
                }
            };
            myBundle.i18n.toolbars.draw = defaults[that._config.language];
        });
        // create graphics layer
        this._mapApi.layersObj.addLayer('graphicsRvColl');
        // create geometry service and set event for measures
        this._geometryService = RAMP.GAPI.esriBundle.GeometryService(config.url);
        this._geometryService.on('distance-complete', function (evt) { _this.outputDistance(evt); });
        this._geometryService.on('areas-and-lengths-complete', function (evt) { _this.outputAreaAndLength(evt, _this._activeGraphic); });
        this._geometryService.on('lengths-complete', function (evt) { _this.outputLength(evt, _this._activeGraphic); });
        this._geometryService.on('label-points-complete', function (evt) { _this.labelPoint(evt, _this._activeGraphic); });
        MultiLine_1.MultiLineLayer.setMultiLine();
        MultiLine_1.MultilineTextSymbol.setMultiLine();
        return this;
    }
    DrawToolbar.prototype.initToolbar = function (myBundle, config) {
        var _this = this;
        this._bundle = myBundle;
        this._toolbar = new this._bundle.esriTool(this._mapApi.esriMap);
        // set symbols
        this._symbols = {
            point: new this._bundle.SimpleMarkerSymbol(),
            line: new this._bundle.SimpleLineSymbol(),
            polygon: new this._bundle.SimpleFillSymbol()
        };
        // set measurement parameters
        this._distanceParams = new this._bundle.DistanceParams();
        this._distanceParams.distanceUnit = this._bundle.GeomService.UNIT_KILOMETER;
        this._distanceParams.geodesic = true;
        this._lengthParams = new this._bundle.LengthParams();
        this._lengthParams.lengthUnit = this._bundle.GeomService.UNIT_KILOMETER;
        this._lengthParams.geodesic = true;
        this._areaParams = new this._bundle.AreaParams();
        this._areaParams.lengthUnit = this._bundle.GeomService.UNIT_KILOMETER;
        this._areaParams.areaUnit = this._bundle.GeomService.UNIT_SQUARE_KILOMETERS;
        this._areaParams.calculationType = 'preserveShape';
        // define on draw complete event
        var that = this;
        this._toolbar.on('draw-complete', function (evt) { _this.addToMap(evt, _this._symbols); });
        this._mapApi.esriMap.on('pan-end', function () { setTimeout(function () { return _this.createBackground(); }, 0); });
        this._mapApi.esriMap.on('zoom-end', function () { setTimeout(function () { return _this.createBackground(); }, 0); });
    };
    Object.defineProperty(DrawToolbar.prototype, "activeTool", {
        get: function () {
            return this._activeTool;
        },
        set: function (value) {
            if (value === '') {
                this._toolbar.deactivate();
                this.disableDetails(false);
            }
            else {
                this._toolbar.activate(this._bundle.esriTool[value.toUpperCase()]);
                this.disableDetails(true);
            }
            this._activeTool = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawToolbar.prototype, "activeColor", {
        get: function () {
            return this._activeColor;
        },
        set: function (value) {
            this._activeColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawToolbar.prototype, "geometryLength", {
        get: function () {
            return this._geomLength;
        },
        set: function (value) {
            this._geomLength = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawToolbar.prototype, "mapPoints", {
        get: function () {
            return this._mapPoint;
        },
        set: function (value) {
            this._mapPoint = value;
            if (value.length === 2) {
                // get length measure
                this._distanceParams.geometry1 = value[0];
                this._distanceParams.geometry2 = value[1];
                this._geometryService.distance(this._distanceParams);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawToolbar.prototype, "graphicKey", {
        get: function () {
            return this._graphicKey;
        },
        set: function (value) {
            this._graphicKey = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawToolbar.prototype, "graphicsLayer", {
        get: function () {
            return this._mapApi.esriMap._layers.graphicsRvColl;
        },
        enumerable: true,
        configurable: true
    });
    DrawToolbar.prototype.importGraphics = function (graphics) {
        for (var _i = 0, graphics_1 = graphics; _i < graphics_1.length; _i++) {
            var item = graphics_1[_i];
            var graphic = new this._bundle.Graphic(item);
            // color doesn't always transfert properly, overwrite it
            graphic.symbol.color = item.symbol.color;
            if (typeof graphic.symbol.outline !== 'undefined') {
                graphic.symbol.outline.color = item.symbol.outline.color;
            }
            // add the key for measure then add to layer
            graphic.key = item.key;
            this.graphicsLayer.add(graphic);
        }
        this.createBackground();
    };
    DrawToolbar.prototype.exportGraphics = function () {
        var graphics = this.graphicsLayer.graphics;
        var output = [];
        for (var _i = 0, graphics_2 = graphics; _i < graphics_2.length; _i++) {
            var graphic = graphics_2[_i];
            // do not keep text background, it will regenerated
            if (typeof graphic.geometry !== 'undefined') {
                // keep the key to link to measure
                var json = graphic.toJson();
                json.key = graphic.key;
                // color doesn't always transfert properly, overwrite it
                json.symbol.color = graphic.symbol.color;
                if (typeof json.symbol.outline !== 'undefined') {
                    json.symbol.outline.color = [
                        graphic.symbol.outline.color.r,
                        graphic.symbol.outline.color.g,
                        graphic.symbol.outline.color.b,
                        graphic.symbol.outline.color.a
                    ];
                }
                output.push(json);
            }
        }
        return JSON.stringify(output);
    };
    // disable/enable details panel
    DrawToolbar.prototype.disableDetails = function (value) {
        this._mapApi.layersObj._identifyMode = value ? [] : this._identifyMode;
    };
    DrawToolbar.prototype.simulateClick = function (pt, mouse) {
        var mapPoint = this._mapApi.esriMap.toMap(new this._bundle.ScreenPoint({ x: pt[0], y: pt[1] }));
        this._mapApi.esriMap.emit(mouse, { mapPoint: new this._bundle.Point(mapPoint.x, mapPoint.y, this._mapApi.esriMap.spatialReference) });
    };
    DrawToolbar.prototype.setExtentPoints = function (value, final) {
        if (final && this._extentPoints.length === 1) {
            var pt = this._mapApi.esriMap.toMap(new this._bundle.ScreenPoint({ x: value[0], y: value[1] }));
            var geometry = {
                xmin: this._extentPoints[0].x,
                ymin: this._extentPoints[0].y,
                xmax: pt.x,
                ymax: pt.y
            };
            this.deleteGraphics(geometry);
            this._extentPoints = [];
        }
        else {
            this._extentPoints[0] = this._mapApi.esriMap.toMap(new this._bundle.ScreenPoint({ x: value[0], y: value[1] }));
        }
    };
    DrawToolbar.prototype.addToMap = function (evt, symbols) {
        switch (evt.geometry.type) {
            case 'point':
                this.addGraphic(evt.geometry, symbols.point);
                break;
            case 'polyline':
                // get length measure
                this._activeGraphic = evt.geometry;
                this._lengthParams.polylines = [evt.geometry];
                this._geometryService.lengths(this._lengthParams);
                this.addGraphic(evt.geometry, symbols.line);
                break;
            case 'polygon':
                // get length and area measure
                this._activeGraphic = evt.geometry;
                this._areaParams.polygons = [evt.geometry];
                this._geometryService.areasAndLengths(this._areaParams);
                this.addGraphic(evt.geometry, symbols.polygon);
                break;
            case 'extent':
                this.deleteGraphics(evt.geometry);
                break;
        }
    };
    DrawToolbar.prototype.addGraphic = function (geometry, symbol) {
        symbol.color = this.activeColor;
        this.graphicKey = Math.random().toString(36).substr(2, 9);
        var graphic = new this._bundle.Graphic(geometry, symbol);
        graphic.key = this.graphicKey;
        this.graphicsLayer.add(graphic);
        // reset number of points for the geometry (use for wcag drawing)
        // reset mapPoints  array to remove theoric line length calculation
        this.geometryLength = 0;
        this.mapPoints = [];
    };
    DrawToolbar.prototype.deleteGraphics = function (geometry) {
        // create a polygon from the extent
        var poly = new this._bundle.Polygon({
            'rings': [[[geometry.xmin, geometry.ymin], [geometry.xmin, geometry.ymax], [geometry.xmax, geometry.ymax], [geometry.xmax, geometry.ymin], [geometry.xmin, geometry.ymin]]],
            'spatialReference': this._mapApi.fgpMapObj.spatialReference
        });
        this.geometryLength = 0;
        this.densifyGeom(poly);
    };
    DrawToolbar.prototype.outputDistance = function (evt) {
        // remove temp graphic
        // use this kind of loop because graphics array is dynamic
        var graphics = this.graphicsLayer.graphics;
        for (var i = 0; i < graphics.length; i++) {
            var graphic_1 = graphics[i];
            if (graphic_1.key === 'tmp') {
                this.graphicsLayer.remove(graphic_1);
                i--;
            }
        }
        // add the new distance
        var graphic = new this._bundle.Graphic(this.mapPoints[1], new this._bundle.TextSymbol(evt.distance.toFixed(2) + " km"));
        graphic.key = 'tmp';
        this.graphicsLayer.add(graphic);
        this.createBackground();
    };
    DrawToolbar.prototype.outputAreaAndLength = function (evt, graphic) {
        graphic.area = evt.result.areas[0].toFixed(2);
        graphic.length = evt.result.lengths[0].toFixed(2);
        this._geometryService.labelPoints([graphic]);
    };
    DrawToolbar.prototype.outputLength = function (evt, graphic) {
        var pt = graphic.paths[0][graphic.paths[0].length - 1];
        var point = new this._bundle.Point(pt[0], pt[1], this._mapApi.esriMap.spatialReference);
        var newGraphic = new this._bundle.Graphic(point, new this._bundle.TextSymbol(evt.result.lengths[0].toFixed(2) + " km"));
        newGraphic.key = this.graphicKey;
        this.graphicsLayer.add(newGraphic);
        this.createBackground();
    };
    DrawToolbar.prototype.labelPoint = function (evt, graphic) {
        var newGraphic = new this._bundle.Graphic(evt.geometries[0], new this._bundle.TextSymbol(graphic.length + " km\n" + graphic.area + " km\u00B2"));
        newGraphic.key = this.graphicKey;
        this.graphicsLayer.add(newGraphic);
        this.createBackground();
    };
    DrawToolbar.prototype.createBackground = function () {
        // delete background
        $('#graphicsRvColl_layer rect').remove();
        // get text element and loop them to create background
        var graphics = $('#graphicsRvColl_layer text').not('.rv-draw-text-hide');
        for (var _i = 0, _a = graphics.toArray(); _i < _a.length; _i++) {
            var graphic = _a[_i];
            var lBox = graphic.getBBox();
            var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', String(lBox.x - 2));
            rect.setAttribute('y', String(lBox.y + 1));
            rect.setAttribute('width', String(lBox.width + 4));
            rect.setAttribute('height', String(lBox.height - 2));
            rect.setAttribute('fill', 'rgba(255,255,255,0.9)');
            $(rect).insertBefore(graphic);
        }
    };
    DrawToolbar.prototype.densifyGeom = function (geom) {
        var _this = this;
        var params = new this._bundle.DensifyParams();
        params.geodesic = true;
        params.geometries = [geom];
        params.lengthUnit = this._geometryService.UNIT_KILOMETER;
        this._geometryService.densify(params, function (geoms) {
            var graphics = _this.graphicsLayer.graphics;
            var key = ['tmp'];
            for (var _i = 0, graphics_3 = graphics; _i < graphics_3.length; _i++) {
                var graphic = graphics_3[_i];
                if (geoms[0].getExtent().intersects(graphic.geometry)) {
                    key.push(graphic.key);
                }
            }
            // use this kind of loop because graphics array is dynamic
            for (var i = 0; i < graphics.length; i++) {
                var graphic = graphics[i];
                if (key.indexOf(graphic.key) !== -1) {
                    _this.graphicsLayer.remove(graphic);
                    i--;
                }
            }
            _this.createBackground();
        });
    };
    ;
    return DrawToolbar;
}());
exports.DrawToolbar = DrawToolbar;
