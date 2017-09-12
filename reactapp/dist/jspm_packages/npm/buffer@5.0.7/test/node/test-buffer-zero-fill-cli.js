/* */
'use strict';

var Buffer = require('../../index').Buffer;
var SlowBuffer = require('../../index').SlowBuffer;
var assert = require('assert');
function isZeroFilled(buf) {
  for (var n = 0; n < buf.length; n++) {
    if (buf[n] > 0) return false;
  }return true;
}
for (var i = 0; i < 50; i++) {
  var bufs = [Buffer.alloc(20), Buffer.allocUnsafe(20), SlowBuffer(20), Buffer(20), new SlowBuffer(20)];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = bufs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var buf = _step.value;

      assert(isZeroFilled(buf));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
//# sourceMappingURL=test-buffer-zero-fill-cli.js.map