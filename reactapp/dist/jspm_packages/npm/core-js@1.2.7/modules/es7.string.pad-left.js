/* */
'use strict';

var $export = require('./$.export'),
    $pad = require('./$.string-pad');
$export($export.P, 'String', { padLeft: function padLeft(maxLength) {
        return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    } });
//# sourceMappingURL=es7.string.pad-left.js.map