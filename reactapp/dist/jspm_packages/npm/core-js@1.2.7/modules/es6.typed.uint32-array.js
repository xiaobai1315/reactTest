'use strict';

/* */
require('./$.typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
//# sourceMappingURL=es6.typed.uint32-array.js.map