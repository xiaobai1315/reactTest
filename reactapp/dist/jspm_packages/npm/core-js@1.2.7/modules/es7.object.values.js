'use strict';

/* */
var $export = require('./$.export'),
    $values = require('./$.object-to-array')(false);
$export($export.S, 'Object', { values: function values(it) {
        return $values(it);
    } });
//# sourceMappingURL=es7.object.values.js.map