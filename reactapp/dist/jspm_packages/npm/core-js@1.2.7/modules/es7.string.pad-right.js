/* */
'use strict';

var $export = require('./$.export'),
    $pad = require('./$.string-pad');
$export($export.P, 'String', { padRight: function padRight(maxLength) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
    } });
//# sourceMappingURL=es7.string.pad-right.js.map