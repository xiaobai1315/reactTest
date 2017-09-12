'use strict';

/* */
var isObject = require('./$.is-object');
require('./$.object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
//# sourceMappingURL=es6.object.is-sealed.js.map