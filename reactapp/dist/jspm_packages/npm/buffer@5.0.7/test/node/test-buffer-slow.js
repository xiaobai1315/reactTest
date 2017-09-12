/* */
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Buffer = require('../../index').Buffer;
var assert = require('assert');
var buffer = require('../../index');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var ones = [1, 1, 1, 1];
var sb = SlowBuffer(4);
assert(sb instanceof Buffer);
assert.strictEqual(sb.length, 4);
sb.fill(1);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = sb.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _ref = _step.value;

    var _ref2 = _slicedToArray(_ref, 2);

    var key = _ref2[0];
    var value = _ref2[1];

    assert.deepStrictEqual(value, ones[key]);
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

assert.strictEqual(sb.buffer.byteLength, 4);
sb = SlowBuffer(4);
assert(sb instanceof Buffer);
assert.strictEqual(sb.length, 4);
sb.fill(1);
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = sb.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _ref3 = _step2.value;

    var _ref4 = _slicedToArray(_ref3, 2);

    var key = _ref4[0];
    var value = _ref4[1];

    assert.deepStrictEqual(value, ones[key]);
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

assert.strictEqual(SlowBuffer(0).length, 0);
try {
  assert.strictEqual(SlowBuffer(buffer.kMaxLength).length, buffer.kMaxLength);
} catch (e) {
  assert.equal(e.message, 'Array buffer allocation failed');
}
assert.strictEqual(SlowBuffer('6').length, 6);
assert.strictEqual(SlowBuffer(true).length, 1);
assert.strictEqual(SlowBuffer().length, 0);
assert.strictEqual(SlowBuffer(NaN).length, 0);
assert.strictEqual(SlowBuffer({}).length, 0);
assert.strictEqual(SlowBuffer('string').length, 0);
assert.throws(function () {
  SlowBuffer(Infinity);
}, 'invalid Buffer length');
assert.throws(function () {
  SlowBuffer(-1);
}, 'invalid Buffer length');
assert.throws(function () {
  SlowBuffer(buffer.kMaxLength + 1);
}, 'invalid Buffer length');
//# sourceMappingURL=test-buffer-slow.js.map