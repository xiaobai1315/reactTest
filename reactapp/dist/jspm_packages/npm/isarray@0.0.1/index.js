'use strict';

/* */
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
//# sourceMappingURL=index.js.map