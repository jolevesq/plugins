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
/******/ 	return __webpack_require__(__webpack_require__.s = "./swiper/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./swiper/index.ts":
/*!*************************!*\
  !*** ./swiper/index.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Swiper = /** @class */ (function () {\n    function Swiper() {\n        this.closureFunc = function (fn) {\n            var params = [];\n            for (var _i = 1; _i < arguments.length; _i++) {\n                params[_i - 1] = arguments[_i];\n            }\n            var args = Array.prototype.slice.call(arguments, 1);\n            return function () {\n                // Clone the array (with slice()) and append additional arguments\n                // to the existing arguments.\n                var newArgs = args.slice();\n                newArgs.push.apply(newArgs, arguments);\n                return fn.apply(this, newArgs);\n            };\n        };\n    }\n    Swiper.prototype.init = function (mapApi) {\n        var _this = this;\n        this.mapApi = mapApi;\n        // get swiper config\n        this.config = this._RV.getConfig('plugins').swiper;\n        this.config.language = this._RV.getCurrentLang();\n        var myBundlePromise = window.RZ.GAPI.esriLoadApiClasses([['esri/dijit/LayerSwipe', 'layerSwipe']]);\n        myBundlePromise.then(function (myBundle) {\n            _this.setSwiper(myBundle, _this.config);\n        });\n    };\n    Swiper.prototype.setSwiper = function (myBundle, swiper) {\n        // add layers\n        var layers = [];\n        var len = swiper.layers.length;\n        while (len--) {\n            layers.push(this.mapApi.esriMap.getLayer(swiper.layers[len]));\n        }\n        // add swiper div\n        this.mapApi.mapDiv.find('rv-shell').find('.rv-esri-map').prepend('<div id=\"rv-swiper-div\"></div>');\n        // create swiper\n        var swipeWidget = new myBundle.layerSwipe({\n            type: swiper.type,\n            map: this.mapApi.esriMap,\n            layers: layers\n        }, 'rv-swiper-div');\n        var that = this;\n        swipeWidget.on('load', function () {\n            var item = that.mapApi.mapDiv.find('#rv-swiper-div .vertical')[0];\n            // set tabindex and WCAG keyboard offset\n            item.tabIndex = -3;\n            item.addEventListener('keydown', that.closureFunc(function (swipeWidget, item, off, evt) {\n                var value = parseInt(item.style.left);\n                var width = parseInt(that.mapApi.mapDiv.find('#rv-swiper-div').width()) - 10;\n                if (evt.keyCode === 37 && value >= 0) {\n                    // left 37\n                    value = (value > off) ? value -= off : 0;\n                }\n                else if (evt.keyCode === 39 && value <= width) {\n                    // right 39\n                    value = (value <= width - off) ? value += off : width;\n                }\n                item.style.left = String(value + 'px');\n                swipeWidget.swipe();\n            }, swipeWidget, item, swiper.keyboardOffset));\n            // change text if french\n            if (that._RV.getCurrentLang() === 'fr-CA') {\n                item.title = 'Faites glisser pour voir les couches sous-jacentes';\n            }\n        });\n        swipeWidget.startup();\n    };\n    return Swiper;\n}());\nexports.default = Swiper;\nwindow.swiper = Swiper;\n\n\n//# sourceURL=webpack:///./swiper/index.ts?");

/***/ }),

/***/ "./swiper/loader.js":
/*!**************************!*\
  !*** ./swiper/loader.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./swiper/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./swiper/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack:///./swiper/loader.js?");

/***/ }),

/***/ "./swiper/main.scss":
/*!**************************!*\
  !*** ./swiper/main.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./swiper/main.scss?");

/***/ })

/******/ });