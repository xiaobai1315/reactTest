'use strict';

/* */
var $export = require('./$.export'),
    anObject = require('./$.an-object'),
    $isExtensible = Object.isExtensible;
$export($export.S, 'Reflect', { isExtensible: function isExtensible(target) {
        anObject(target);
        return $isExtensible ? $isExtensible(target) : true;
    } });
//# sourceMappingURL=es6.reflect.is-extensible.js.map