'use strict';
/* */
"format cjs";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["resolvePathname"] = factory();else root["resolvePathname"] = factory();
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
			function isAbsolute(pathname) {
				return pathname.charAt(0) === '/';
			}

			// About 1.5x faster than the two-arg version of Array#splice()
			function spliceOne(list, index) {
				for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
					list[i] = list[k];
				}

				list.pop();
			}

			// This implementation is based heavily on node's url.parse
			function resolvePathname(to) {
				var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

				var toParts = to && to.split('/') || [];
				var fromParts = from && from.split('/') || [];

				var isToAbs = to && isAbsolute(to);
				var isFromAbs = from && isAbsolute(from);
				var mustEndAbs = isToAbs || isFromAbs;

				if (to && isAbsolute(to)) {
					// to is absolute
					fromParts = toParts;
				} else if (toParts.length) {
					// to is relative, drop the filename
					fromParts.pop();
					fromParts = fromParts.concat(toParts);
				}

				if (!fromParts.length) return '/';

				var hasTrailingSlash = void 0;
				if (fromParts.length) {
					var last = fromParts[fromParts.length - 1];
					hasTrailingSlash = last === '.' || last === '..' || last === '';
				} else {
					hasTrailingSlash = false;
				}

				var up = 0;
				for (var i = fromParts.length; i >= 0; i--) {
					var part = fromParts[i];

					if (part === '.') {
						spliceOne(fromParts, i);
					} else if (part === '..') {
						spliceOne(fromParts, i);
						up++;
					} else if (up) {
						spliceOne(fromParts, i);
						up--;
					}
				}

				if (!mustEndAbs) for (; up--; up) {
					fromParts.unshift('..');
				}if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

				var result = fromParts.join('/');

				if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

				return result;
			}

			exports.default = resolvePathname;

			/***/
		}]
		/******/)
	);
});
;
//# sourceMappingURL=resolve-pathname.js.map