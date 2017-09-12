'use strict';

/* */
var isObject = require('./$.is-object');
require('./$.object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
//# sourceMappingURL=es6.object.is-extensible.js.map