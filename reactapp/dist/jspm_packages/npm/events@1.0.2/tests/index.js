'use strict';

/* */
_require('./legacy-compat');
var orig_require = _require;
var _require = function _require(file) {
  test(file, function () {
    orig_require(file);
  });
};
_require('./add-listeners');
_require('./check-listener-leaks');
_require('./listeners-side-effects');
_require('./listeners');
_require('./max-listeners');
_require('./modify-in-emit');
_require('./num-args');
_require('./once');
_require('./set-max-listeners-side-effects');
_require('./subclass');
_require('./remove-all-listeners');
_require('./remove-listeners');
//# sourceMappingURL=index.js.map