/* */
'use strict';

var Buffer = require('../../index').Buffer;
var assert = require('assert');
var a = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
var b = Buffer.from([5, 6, 7, 8, 9, 0, 1, 2, 3, 4]);
assert.equal(-1, a.compare(b));
assert.equal(-1, a.compare(b, 0));
assert.equal(-1, a.compare(b, '0'));
assert.equal(-1, a.compare(b, 0, undefined, 0));
assert.equal(1, a.compare(b, 0, 0, 0));
assert.equal(1, a.compare(b, '0', '0', '0'));
assert.equal(1, a.compare(b, 6, 10));
assert.equal(-1, a.compare(b, 6, 10, 0, 0));
assert.equal(1, a.compare(b, 0, 5, 4));
assert.equal(1, a.compare(b, 5, undefined, 1));
assert.equal(-1, a.compare(b, 2, 4, 2));
assert.equal(-1, a.compare(b, 0, 7, 4));
assert.equal(-1, a.compare(b, 0, 7, 4, 6));
assert.equal(1, a.compare(b, 0, null));
assert.equal(-1, a.compare(b, 0, { valueOf: function valueOf() {
    return 5;
  } }));
assert.equal(1, a.compare(b, Infinity, -Infinity));
assert.equal(1, a.compare(b, '0xff'));
var oor = /out of range index/;
assert.throws(function () {
  return a.compare(b, 0, 100, 0);
}, oor);
assert.throws(function () {
  return a.compare(b, 0, 1, 0, 100);
}, oor);
assert.throws(function () {
  return a.compare(b, -1);
}, oor);
assert.throws(function () {
  return a.compare(b, 0, '0xff');
}, oor);
assert.throws(function () {
  return a.compare(b, 0, Infinity);
}, oor);
assert.throws(function () {
  return a.compare(b, -Infinity, Infinity);
}, oor);
assert.throws(function () {
  return a.compare();
}, /Argument must be a Buffer/);
//# sourceMappingURL=test-buffer-compare-offset.js.map