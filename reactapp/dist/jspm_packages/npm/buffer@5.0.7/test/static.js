'use strict';

/* */
var B = require('../index').Buffer;
var test = require('tape');
test('Buffer.isEncoding', function (t) {
  t.equal(B.isEncoding('HEX'), true);
  t.equal(B.isEncoding('hex'), true);
  t.equal(B.isEncoding('bad'), false);
  t.end();
});
test('Buffer.isBuffer', function (t) {
  t.equal(B.isBuffer(new B('hey', 'utf8')), true);
  t.equal(B.isBuffer(new B([1, 2, 3], 'utf8')), true);
  t.equal(B.isBuffer('hey'), false);
  t.end();
});
//# sourceMappingURL=static.js.map