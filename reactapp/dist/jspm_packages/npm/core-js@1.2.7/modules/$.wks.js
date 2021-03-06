'use strict';

/* */
var store = require('./$.shared')('wks'),
    uid = require('./$.uid'),
    _Symbol = require('./$.global').Symbol;
module.exports = function (name) {
    return store[name] || (store[name] = _Symbol && _Symbol[name] || (_Symbol || uid)('Symbol.' + name));
};
//# sourceMappingURL=$.wks.js.map