'use strict';

/* */
require('./$.typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
//# sourceMappingURL=es6.typed.uint8-array.js.map