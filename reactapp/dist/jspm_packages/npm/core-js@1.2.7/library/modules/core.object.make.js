'use strict';

/* */
var $export = require('./$.export'),
    define = require('./$.object-define'),
    create = require('./$').create;
$export($export.S + $export.F, 'Object', { make: function make(proto, mixin) {
        return define(create(proto), mixin);
    } });
//# sourceMappingURL=core.object.make.js.map