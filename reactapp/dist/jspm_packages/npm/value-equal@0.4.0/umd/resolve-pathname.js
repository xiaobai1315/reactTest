'use strict';
/* */
"format cjs";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["valueEqual"] = factory();else root["valueEqual"] = factory();
})(undefined, function () {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports) {

			'use strict';

			exports.__esModule = true;

			var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
				return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
			} : function (obj) {
				return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
			};

			var valueEqual = function valueEqual(a, b) {
				if (a === b) return true;

				if (a == null || b == null) return false;

				if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
					return valueEqual(item, b[index]);
				});

				var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
				var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

				if (aType !== bType) return false;

				if (aType === 'object') {
					var aValue = a.valueOf();
					var bValue = b.valueOf();

					if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

					var aKeys = Object.keys(a);
					var bKeys = Object.keys(b);

					if (aKeys.length !== bKeys.length) return false;

					return aKeys.every(function (key) {
						return valueEqual(a[key], b[key]);
					});
				}

				return false;
			};

			exports.default = valueEqual;

			/***/
		}]
		/******/)
	);
});
;
//# sourceMappingURL=resolve-pathname.js.map