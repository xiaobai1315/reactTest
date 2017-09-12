'use strict';

/* */
var $export = require('./$.export'),
    setProto = require('./$.set-proto');
if (setProto) $export($export.S, 'Reflect', { setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  } });
//# sourceMappingURL=es6.reflect.set-prototype-of.js.map