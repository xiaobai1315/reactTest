"use strict";

/* */
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};
//# sourceMappingURL=$.fails.js.map