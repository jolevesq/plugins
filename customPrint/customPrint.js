/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./customPrint/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./customPrint/index.ts":
/*!******************************!*\
  !*** ./customPrint/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar template_1 = __webpack_require__(/*! ./template */ \"./customPrint/template.ts\");\nvar CustomPrint = /** @class */ (function () {\n    function CustomPrint() {\n    }\n    CustomPrint.prototype.init = function (api) {\n        this.api = api;\n        // get template path\n        this.config = this._RV.getConfig('plugins').customPrint;\n        // add side menu button\n        this.button = this.api.mapI.addPluginButton(CustomPrint.prototype.translations[this._RV.getCurrentLang()].title, this.onMenuItemClick());\n        // TODO: remove toggle side nav\n        this._RV.toggleSideNav('open');\n        // create panel for form\n        this.panelForm = this.api.panels.create('customPrintForm');\n        this.panelForm.element.css(CustomPrint.prototype.panelOptionsForm);\n        // create panel for print\n        this.panelView = this.api.panels.create('customPrintView');\n        this.panelView.element.css(CustomPrint.prototype.panelOptionsView);\n        this.panelView.header.title = CustomPrint.prototype.translations[this._RV.getCurrentLang()].title;\n        this.panelView.header.closeButton;\n    };\n    CustomPrint.prototype.onMenuItemClick = function () {\n        var _this = this;\n        return function () {\n            new Promise(function (resolve) {\n                $.ajax({\n                    method: 'GET',\n                    url: _this.config.template,\n                    cache: false,\n                    dataType: 'html'\n                }).then(function (html) {\n                    resolve(html);\n                });\n            }).then(function (html) { return _this.createForm(html); });\n        };\n    };\n    CustomPrint.prototype.createForm = function (html) {\n        // convert string to list of nodes and get aray of controls\n        var htmlNodes = new DOMParser().parseFromString(html, 'text/html').body.childNodes;\n        var controls = $(htmlNodes).find('[data-type=\"controls\"]').toArray();\n        // loop trought controls to create an array of input for the form\n        var items = [];\n        for (var _i = 0, controls_1 = controls; _i < controls_1.length; _i++) {\n            var control = controls_1[_i];\n            console.log('test');\n            var item = {\n                label: control.getAttribute('data-label'),\n                type: control.getAttribute('data-cast')\n            };\n            items.push(item);\n        }\n        // set the angular from and controller\n        this.setAngular(items, htmlNodes);\n    };\n    CustomPrint.prototype.setAngular = function (items, htmlNodes) {\n        var that = this;\n        this.api.agControllerRegister('printCtrl', function () {\n            var _this = this;\n            this.controls = items;\n            this.print = function () {\n                // set values from the form\n                that.panelView.body = $(that.setValues(_this.controls, htmlNodes)).html();\n                // set values for canvas\n                that.setCanvas().then(function (canvas) {\n                    for (var _i = 0, _a = canvas; _i < _a.length; _i++) {\n                        var canva = _a[_i];\n                        $(that.panelView.body).find(\"[data-type=\\\"\" + canva.type + \"\\\"]\").append(canva.value);\n                    }\n                    that.panelView.open();\n                });\n            };\n        });\n        // add print controls\n        this.panelForm.body = template_1.PRINT_FORM_TEMPLATE;\n        this.panelForm.open();\n        // toggle side nav\n        this._RV.toggleSideNav('close');\n    };\n    CustomPrint.prototype.setValues = function (items, htmlNodes) {\n        var controls = $(htmlNodes).find('[data-type=\"controls\"]').toArray();\n        for (var i in controls) {\n            controls[i].innerHTML = items[i].value;\n        }\n        return htmlNodes;\n    };\n    CustomPrint.prototype.setCanvas = function () {\n        var _this = this;\n        return new Promise(function (resolve) {\n            // call the export to generate all the canvas\n            _this.api.export();\n            // wait for the canvas\n            var inter = setInterval(function () {\n                // loop trought the canvas element and add needed one\n                if ($('.rv-export canvas').length !== 0) {\n                    clearInterval(inter);\n                    var canvasMap = _this.cloneCanvas($('.rv-export-section canvas')[0]);\n                    var canvasScale = _this.cloneCanvas($('.rv-export-section canvas')[1]);\n                    var canvasLegend = _this.cloneCanvas($('.rv-export-section canvas')[2]);\n                    var canvasFootNote = _this.cloneCanvas($('.rv-export-section canvas')[3]);\n                    var canvas = [{ type: 'map', value: canvasMap }, { type: 'note', value: canvasFootNote }];\n                    resolve(canvas);\n                }\n            }, 5000);\n        });\n    };\n    CustomPrint.prototype.cloneCanvas = function (oldCanvas) {\n        // create a new canvas\n        var newCanvas = document.createElement('canvas');\n        var context = newCanvas.getContext('2d');\n        // set dimensions\n        newCanvas.width = oldCanvas.width;\n        newCanvas.height = oldCanvas.height;\n        // apply the old canvas to the new one\n        context.drawImage(oldCanvas, 0, 0);\n        // return the new canvas\n        return newCanvas;\n    };\n    CustomPrint.prototype.compileTemplate = function (template) {\n        var temp = $(template);\n        this.api.$compile(temp);\n        return temp;\n    };\n    return CustomPrint;\n}());\nCustomPrint.prototype.panelOptionsForm = { bottom: '0em', width: '400px', top: '50px' };\nCustomPrint.prototype.panelOptionsView = { bottom: '0em', right: '50px', top: '50px', left: '450px' };\nCustomPrint.prototype.translations = {\n    'en-CA': {\n        title: 'Custom print'\n    },\n    'fr-CA': {\n        title: 'Impression Personnalisée'\n    }\n};\nwindow.customPrint = CustomPrint;\n\n\n//# sourceURL=webpack:///./customPrint/index.ts?");

/***/ }),

/***/ "./customPrint/loader.js":
/*!*******************************!*\
  !*** ./customPrint/loader.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./customPrint/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./customPrint/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./customPrint/loader.js?");

/***/ }),

/***/ "./customPrint/main.scss":
/*!*******************************!*\
  !*** ./customPrint/main.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./customPrint/main.scss?");

/***/ }),

/***/ "./customPrint/template.ts":
/*!*********************************!*\
  !*** ./customPrint/template.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// panels templates: customPrint\nexports.PRINT_FORM_TEMPLATE = \"\\n<div class=\\\"\\\">\\n    <div class=\\\"\\\" ng-controller=\\\"printCtrl as ctrl\\\">\\n        <md-input-container class=\\\"md-block\\\" ng-repeat=\\\"control in ctrl.controls\\\" name=\\\"{{ control.label }}\\\">\\n            <input\\n                aria-label=\\\"{{ control.label }}\\\"\\n                placeholder=\\\"{{ control.label }}\\\"\\n                ng-model=\\\"control.value\\\">\\n        </md-input-container>\\n\\n        <md-button\\n            aria-label=\\\"{{ 'plugins.customPrint.title' | translate }}\\\"\\n            class=\\\"md-icon-button primary\\\"\\n            ng-click=\\\"ctrl.print()\\\">\\n                {{ 'plugins.customPrint.title' | translate }}\\n            <md-tooltip>{{ 'plugins.customPrint.title' | translate }}</md-tooltip>\\n        </md-button>\\n    </div>\\n</div>\\n\";\n\n\n//# sourceURL=webpack:///./customPrint/template.ts?");

/***/ })

/******/ });