'use strict';

/* */
var $ = require('./$');
if (require('./$.descriptors') && /./g.flags != 'g') $.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./$.flags')
});
//# sourceMappingURL=es6.regexp.flags.js.map