'use strict';

/* */
require('./$.typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
//# sourceMappingURL=es6.typed.uint16-array.js.map