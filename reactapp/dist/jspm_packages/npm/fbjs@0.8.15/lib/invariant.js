'use strict';

/* */
(function (process) {
  'use strict';

  var validateFormat = function validateFormat(format) {};
  if (process.env.NODE_ENV !== 'production') {
    validateFormat = function validateFormat(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }
  function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1;
      throw error;
    }
  }
  module.exports = invariant;
})(require('process'));
//# sourceMappingURL=invariant.js.map