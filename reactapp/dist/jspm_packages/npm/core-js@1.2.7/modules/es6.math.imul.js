'use strict';

/* */
var $export = require('./$.export'),
    $imul = Math.imul;
$export($export.S + $export.F * require('./$.fails')(function () {
    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', { imul: function imul(x, y) {
        var UINT16 = 0xffff,
            xn = +x,
            yn = +y,
            xl = UINT16 & xn,
            yl = UINT16 & yn;
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    } });
//# sourceMappingURL=es6.math.imul.js.map