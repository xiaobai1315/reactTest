'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* */
(function (process) {
  if (process.env.NODE_ENV !== 'production') {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };
    var throwOnDirectAccess = true;
    module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
  } else {
    module.exports = require('./factoryWithThrowingShims')();
  }
})(require('process'));
//# sourceMappingURL=index.js.map