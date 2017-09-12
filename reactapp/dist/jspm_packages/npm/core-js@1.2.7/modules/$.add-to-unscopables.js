'use strict';

/* */
var UNSCOPABLES = require('./$.wks')('unscopables'),
    ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};
//# sourceMappingURL=$.add-to-unscopables.js.map