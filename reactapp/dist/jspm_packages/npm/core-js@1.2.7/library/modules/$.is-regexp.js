'use strict';

/* */
var isObject = require('./$.is-object'),
    cof = require('./$.cof'),
    MATCH = require('./$.wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
//# sourceMappingURL=$.is-regexp.js.map