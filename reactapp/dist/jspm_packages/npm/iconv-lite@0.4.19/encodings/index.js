/* */
"use strict";

var modules = [require('./internal'), require('./utf16'), require('./utf7'), require('./sbcs-codec'), require('./sbcs-data'), require('./sbcs-data-generated'), require('./dbcs-codec'), require('./dbcs-data')];
for (var i = 0; i < modules.length; i++) {
  var _module = modules[i];
  for (var enc in _module) {
    if (Object.prototype.hasOwnProperty.call(_module, enc)) exports[enc] = _module[enc];
  }
}
//# sourceMappingURL=index.js.map