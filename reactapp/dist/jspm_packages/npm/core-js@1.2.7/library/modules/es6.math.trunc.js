'use strict';

/* */
var $export = require('./$.export');
$export($export.S, 'Math', { trunc: function trunc(it) {
        return (it > 0 ? Math.floor : Math.ceil)(it);
    } });
//# sourceMappingURL=es6.math.trunc.js.map