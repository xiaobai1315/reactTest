'use strict';

/* */
require('./$.typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);
//# sourceMappingURL=es6.typed.uint8-clamped-array.js.map