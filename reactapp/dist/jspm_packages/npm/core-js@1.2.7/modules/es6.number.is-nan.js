'use strict';

/* */
var $export = require('./$.export');
$export($export.S, 'Number', { isNaN: function isNaN(number) {
        return number != number;
    } });
//# sourceMappingURL=es6.number.is-nan.js.map