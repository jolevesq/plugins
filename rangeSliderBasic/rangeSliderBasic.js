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
/******/ 	return __webpack_require__(__webpack_require__.s = "./rangeSliderBasic/loader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./rangeSliderBasic/index.ts":
/*!***********************************!*\
  !*** ./rangeSliderBasic/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar RangeSliderBasic = /** @class */ (function () {\n    function RangeSliderBasic() {\n    }\n    RangeSliderBasic.prototype.init = function (mapApi) {\n        this.mapApi = mapApi;\n    };\n    return RangeSliderBasic;\n}());\nexports.default = RangeSliderBasic;\n// TableBuilder.prototype.tableOptions = {\n//     enableSorting: true,\n//     floatingFilter: true,\n//     autoSizePadding: 75,\n//     suppressColumnVirtualisation: true,\n//     ensureDomOrder: true,\n//     defaultColDef: {\n//         width: 100\n//     }\n// };\nRangeSliderBasic.prototype.translations = {\n    'en-CA': {\n        settings: 'Layer settings',\n        histo: 'Histogram',\n        bar: {\n            lock: \"Lock left anchor\",\n            unlock: \"Unlock left anchor\",\n            previous: \"Previous\",\n            play: \"Play\",\n            pause: \"Pause\",\n            foward: \"Foward\",\n            delay: \"Delay\",\n            refresh: \"Refresh\"\n        }\n    },\n    'fr-CA': {\n        settings: 'Paramètres de la couche',\n        histo: 'Histogramme',\n        bar: {\n            lock: \"Verrouiller la molette gauche\",\n            unlock: \"Déverrouiller la molette gauche\",\n            previous: \"Précédent\",\n            play: \"Jouer\",\n            pause: \"Pause\",\n            foward: \"Suivant\",\n            delay: \"Délai\",\n            refresh: \"Rafraîchir\"\n        }\n    }\n};\nwindow.rangeSliderBasic = RangeSliderBasic;\n\n\n//# sourceURL=webpack:///./rangeSliderBasic/index.ts?");

/***/ }),

/***/ "./rangeSliderBasic/loader.js":
/*!************************************!*\
  !*** ./rangeSliderBasic/loader.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.ts */ \"./rangeSliderBasic/index.ts\");\n/* harmony import */ var _index_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.scss */ \"./rangeSliderBasic/main.scss\");\n/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./rangeSliderBasic/loader.js?");

/***/ }),

/***/ "./rangeSliderBasic/main.scss":
/*!************************************!*\
  !*** ./rangeSliderBasic/main.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./rangeSliderBasic/main.scss?");

/***/ })

/******/ });