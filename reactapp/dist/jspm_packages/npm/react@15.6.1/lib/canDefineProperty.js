'use strict';

/* */
(function (process) {
  'use strict';

  var canDefineProperty = false;
  if (process.env.NODE_ENV !== 'production') {
    try {
      Object.defineProperty({}, 'x', { get: function get() {} });
      canDefineProperty = true;
    } catch (x) {}
  }
  module.exports = canDefineProperty;
})(require('process'));
//# sourceMappingURL=canDefineProperty.js.map