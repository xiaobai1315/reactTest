'use strict';

/* */
require('./$.typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
//# sourceMappingURL=es6.typed.float64-array.js.map