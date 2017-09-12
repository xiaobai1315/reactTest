/* */
'use strict';

var Buffer = require('../../index').Buffer;
var assert = require('assert');
var safe = Buffer.alloc(10);
function isZeroFilled(buf) {
  for (var n = 0; n < buf.length; n++) {
    if (buf[n] !== 0) return false;
  }return true;
}
assert(isZeroFilled(safe));
Buffer.allocUnsafe(10);
assert(isZeroFilled(new Float64Array(10)));
new Buffer(10);
assert(isZeroFilled(new Float64Array(10)));
Buffer.allocUnsafe(10);
assert(isZeroFilled(Buffer.alloc(10)));
//# sourceMappingURL=test-buffer-safe-unsafe.js.map