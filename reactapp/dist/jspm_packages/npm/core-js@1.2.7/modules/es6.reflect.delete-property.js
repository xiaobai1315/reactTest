'use strict';

/* */
var $export = require('./$.export'),
    getDesc = require('./$').getDesc,
    anObject = require('./$.an-object');
$export($export.S, 'Reflect', { deleteProperty: function deleteProperty(target, propertyKey) {
        var desc = getDesc(anObject(target), propertyKey);
        return desc && !desc.configurable ? false : delete target[propertyKey];
    } });
//# sourceMappingURL=es6.reflect.delete-property.js.map