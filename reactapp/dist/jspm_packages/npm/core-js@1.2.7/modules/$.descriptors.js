'use strict';

/* */
module.exports = !require('./$.fails')(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});
//# sourceMappingURL=$.descriptors.js.map