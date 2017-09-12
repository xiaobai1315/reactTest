'use strict';

/* */
var $export = require('./$.export'),
    $re = require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');
$export($export.S, 'RegExp', { escape: function escape(it) {
        return $re(it);
    } });
//# sourceMappingURL=es7.regexp.escape.js.map