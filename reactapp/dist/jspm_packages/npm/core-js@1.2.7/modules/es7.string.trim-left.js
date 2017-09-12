/* */
'use strict';

require('./$.string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
});
//# sourceMappingURL=es7.string.trim-left.js.map