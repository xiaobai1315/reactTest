'use strict';

/* */
var toObject = require('./$.to-object');
require('./$.object-sap')('keys', function ($keys) {
  return function keys(it) {
    return $keys(toObject(it));
  };
});
//# sourceMappingURL=es6.object.keys.js.map