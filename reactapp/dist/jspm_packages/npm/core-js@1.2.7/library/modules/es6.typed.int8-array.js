'use strict';

/* */
require('./$.typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
//# sourceMappingURL=es6.typed.int8-array.js.map