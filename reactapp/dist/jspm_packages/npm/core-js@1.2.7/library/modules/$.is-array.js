'use strict';

/* */
var cof = require('./$.cof');
module.exports = Array.isArray || function (arg) {
  return cof(arg) == 'Array';
};
//# sourceMappingURL=$.is-array.js.map