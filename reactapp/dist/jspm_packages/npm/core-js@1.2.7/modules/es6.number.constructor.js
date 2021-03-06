/* */
'use strict';

var $ = require('./$'),
    global = require('./$.global'),
    has = require('./$.has'),
    cof = require('./$.cof'),
    toPrimitive = require('./$.to-primitive'),
    fails = require('./$.fails'),
    $trim = require('./$.string-trim').trim,
    NUMBER = 'Number',
    $Number = global[NUMBER],
    Base = $Number,
    proto = $Number.prototype,
    BROKEN_COF = cof($.create(proto)) == NUMBER,
    TRIM = 'trim' in String.prototype;
var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0),
        third,
        radix,
        maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN;
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        if (code < 48 || code > maxCode) return NaN;
      }
      return parseInt(digits, radix);
    }
  }
  return +it;
};
if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value,
        that = this;
    return that instanceof $Number && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(require('./$.descriptors') ? $.getNames(Base) : ('MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + 'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), function (key) {
    if (has(Base, key) && !has($Number, key)) {
      $.setDesc($Number, key, $.getDesc(Base, key));
    }
  });
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redefine')(global, NUMBER, $Number);
}
//# sourceMappingURL=es6.number.constructor.js.map