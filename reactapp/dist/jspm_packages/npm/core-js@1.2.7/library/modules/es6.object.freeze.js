'use strict';

/* */
var isObject = require('./$.is-object');
require('./$.object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
//# sourceMappingURL=es6.object.freeze.js.map