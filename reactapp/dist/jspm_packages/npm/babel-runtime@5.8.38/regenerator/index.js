"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* */
var g = (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined;
var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
var oldRuntime = hadRuntime && g.regeneratorRuntime;
g.regeneratorRuntime = undefined;
module.exports = require('./runtime');
if (hadRuntime) {
  g.regeneratorRuntime = oldRuntime;
} else {
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}
module.exports = {
  "default": module.exports,
  __esModule: true
};
//# sourceMappingURL=index.js.map