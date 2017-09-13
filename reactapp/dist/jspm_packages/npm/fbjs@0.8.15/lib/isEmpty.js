'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* */
(function (process) {
  'use strict';

  var invariant = require('./invariant');
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
      if (value) {
        !(!isIterable(value) || value.size === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'isEmpty() does not support iterable collections.') : invariant(false) : void 0;
        for (var _ in value) {
          return false;
        }
      }
      return true;
    } else {
      return !value;
    }
  }
  function isIterable(value) {
    if (typeof Symbol === 'undefined') {
      return false;
    }
    return value[Symbol.iterator];
  }
  module.exports = isEmpty;
})(require('process'));
//# sourceMappingURL=isEmpty.js.map