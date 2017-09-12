'use strict';

/* */
var toIObject = require('./$.to-iobject');
require('./$.object-sap')('getOwnPropertyDescriptor', function ($getOwnPropertyDescriptor) {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
//# sourceMappingURL=es6.object.get-own-property-descriptor.js.map