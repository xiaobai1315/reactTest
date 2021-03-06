'use strict';

/* */
var forOf = require('./$.for-of'),
    classof = require('./$.classof');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
//# sourceMappingURL=$.collection-to-json.js.map