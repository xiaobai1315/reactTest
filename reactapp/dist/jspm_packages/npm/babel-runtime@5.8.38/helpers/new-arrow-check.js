/* */
"use strict";

exports["default"] = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

exports.__esModule = true;
//# sourceMappingURL=new-arrow-check.js.map