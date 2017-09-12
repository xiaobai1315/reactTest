/* */
'use strict';

var $ = require('./$'),
    isObject = require('./$.is-object'),
    HAS_INSTANCE = require('./$.wks')('hasInstance'),
    FunctionProto = Function.prototype;
if (!(HAS_INSTANCE in FunctionProto)) $.setDesc(FunctionProto, HAS_INSTANCE, { value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    while (O = $.getProto(O)) {
      if (this.prototype === O) return true;
    }return false;
  } });
//# sourceMappingURL=es6.function.has-instance.js.map