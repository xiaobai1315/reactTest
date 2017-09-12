'use strict';

/* */
var $export = require('./$.export'),
    defined = require('./$.defined'),
    fails = require('./$.fails'),
    spaces = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF',
    space = '[' + spaces + ']',
    non = '\u200B\x85',
    ltrim = RegExp('^' + space + space + '*'),
    rtrim = RegExp(space + space + '*$');
var exporter = function exporter(KEY, exec) {
  var exp = {};
  exp[KEY] = exec(trim);
  $export($export.P + $export.F * fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};
module.exports = exporter;
//# sourceMappingURL=$.string-trim.js.map