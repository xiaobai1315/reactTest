"use strict";

/* */
module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) throw TypeError(name + ": use the 'new' operator!");
  return it;
};
//# sourceMappingURL=$.strict-new.js.map