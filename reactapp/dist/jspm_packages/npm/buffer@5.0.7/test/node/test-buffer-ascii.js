/* */
'use strict';

var Buffer = require('../../index').Buffer;
var assert = require('assert');
assert.equal(Buffer.from('hérité').toString('ascii'), 'hC)ritC)');
var input = 'C’est, graphiquement, la réunion d’un accent aigu ' + 'et d’un accent grave.';
var expected = 'Cb\0\x19est, graphiquement, la rC)union ' + 'db\0\x19un accent aigu et db\0\x19un ' + 'accent grave.';
var buf = Buffer.from(input);
for (var i = 0; i < expected.length; ++i) {
  assert.equal(buf.slice(i).toString('ascii'), expected.slice(i));
  if (input.charCodeAt(i) > 65535) ++i;
  if (input.charCodeAt(i) > 127) ++i;
}
//# sourceMappingURL=test-buffer-ascii.js.map