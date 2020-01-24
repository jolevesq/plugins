"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// source: https://github.com/suytt/esri.symbol.MultiLineTextSymbol/blob/master/esri.symbol.MultiLineTextSymbol.js
var MultiLineLayer = /** @class */ (function () {
    function MultiLineLayer() {
    }
    MultiLineLayer.setMultiLine = function () {
        var _this = this;
        var myBundlePromise = RAMP.GAPI.esriLoadApiClasses([
            ['esri/layers/LabelLayer', 'LabelLayer']
        ]);
        myBundlePromise.then(function () {
            if (typeof window.esri.layers.LabelLayer.prototype._addLabel === 'function') {
                window.esri.layers.LabelLayer.prototype._addLabel2 = window.esri.layers.LabelLayer.prototype._addLabel;
                window.esri.layers.LabelLayer.prototype._addLabel = function (a, b, c, e, g, k, m) {
                    // replace \n by <br>
                    a = a.replace(/\n/g, '<br />');
                    _this._addLabel2(a, b, c, e, g, k, m);
                };
            }
        });
    };
    return MultiLineLayer;
}());
exports.MultiLineLayer = MultiLineLayer;
var MultilineTextSymbol = /** @class */ (function () {
    function MultilineTextSymbol() {
    }
    MultilineTextSymbol.setMultiLine = function () {
        var myBundlePromise = RAMP.GAPI.esriLoadApiClasses([
            ['esri/symbols/TextSymbol', 'TextSymbol'],
            ['dojox/gfx/svg', 'svg']
        ]);
        myBundlePromise.then(function () {
            if (typeof window.dojox.gfx.svg.Text.prototype.setShape === 'function') {
                // do not use arrow function because if we do so, we loose the context of this
                window.dojox.gfx.svg.Text.prototype.setShape = function (p) {
                    this.shape = window.dojox.gfx.makeParameters(this.shape, p);
                    this.bbox = null;
                    var r = this.rawNode;
                    var s = this.shape;
                    r.setAttribute('x', s.x);
                    r.setAttribute('y', s.y - 10);
                    r.setAttribute('text-anchor', s.align);
                    r.setAttribute('text-decoration', s.decoration);
                    r.setAttribute('rotate', s.rotated ? 90 : 0);
                    r.setAttribute('kerning', s.kerning ? 'auto' : 0);
                    r.setAttribute('text-rendering', 'optimizeLegibility');
                    while (r.firstChild) {
                        r.removeChild(r.firstChild);
                    }
                    if (p.text) {
                        var texts = p.text.replace(/<br\s*\/?>/ig, '\n').split('\n');
                        var lineHeight = 1.1 * parseInt(document.defaultView.getComputedStyle(r, '').getPropertyValue('font-size'), 10);
                        if (isNaN(lineHeight) || !isFinite(lineHeight)) {
                            lineHeight = 15;
                        }
                        for (var i = 0, n = texts.length; i < n; i++) {
                            var tspan = (document.createElementNS ? document.createElementNS(window.dojox.gfx.svg.xmlns.svg, 'tspan') : document.createElement('tspan'));
                            tspan.setAttribute('dy', i ? String(lineHeight) : String(-(texts.length - 1) * lineHeight / 2));
                            tspan.setAttribute('x', s.x);
                            tspan.appendChild((window.dojox.gfx.useSvgWeb ? document.createTextNode(texts[i]) : document.createTextNode(texts[i])));
                            r.appendChild(tspan);
                        }
                    }
                    return this;
                };
            }
        });
    };
    return MultilineTextSymbol;
}());
exports.MultilineTextSymbol = MultilineTextSymbol;
