'use strict';

/* */
var $ = require('./$'),
    $export = require('./$.export'),
    anObject = require('./$.an-object');
$export($export.S, 'Reflect', { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return $.getDesc(anObject(target), propertyKey);
    } });
//# sourceMappingURL=es6.reflect.get-own-property-descriptor.js.map