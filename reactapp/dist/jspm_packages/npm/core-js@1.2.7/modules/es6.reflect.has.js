'use strict';

/* */
var $export = require('./$.export');
$export($export.S, 'Reflect', { has: function has(target, propertyKey) {
        return propertyKey in target;
    } });
//# sourceMappingURL=es6.reflect.has.js.map