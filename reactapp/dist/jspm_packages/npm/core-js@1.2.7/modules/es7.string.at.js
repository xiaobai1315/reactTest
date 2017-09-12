/* */
'use strict';

var $export = require('./$.export'),
    $at = require('./$.string-at')(true);
$export($export.P, 'String', { at: function at(pos) {
        return $at(this, pos);
    } });
//# sourceMappingURL=es7.string.at.js.map