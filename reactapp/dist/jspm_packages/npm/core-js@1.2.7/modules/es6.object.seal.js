'use strict';

/* */
var isObject = require('./$.is-object');
require('./$.object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
//# sourceMappingURL=es6.object.seal.js.map