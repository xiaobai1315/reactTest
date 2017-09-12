/* */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Symbol = require('../core-js/symbol')["default"];
exports["default"] = function (obj) {
  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
exports.__esModule = true;
//# sourceMappingURL=typeof.js.map