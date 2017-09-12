'use strict';

/* */
var IObject = require('./$.iobject'),
    defined = require('./$.defined');
module.exports = function (it) {
  return IObject(defined(it));
};
//# sourceMappingURL=$.to-iobject.js.map