'use strict';

/* */
var Iterators = require('./$.iterators'),
    ITERATOR = require('./$.wks')('iterator'),
    ArrayProto = Array.prototype;
module.exports = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
//# sourceMappingURL=$.is-array-iter.js.map