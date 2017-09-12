'use strict';

/* */
var $export = require('./$.export'),
    isInteger = require('./$.is-integer'),
    abs = Math.abs;
$export($export.S, 'Number', { isSafeInteger: function isSafeInteger(number) {
        return isInteger(number) && abs(number) <= 0x1fffffffffffff;
    } });
//# sourceMappingURL=es6.number.is-safe-integer.js.map