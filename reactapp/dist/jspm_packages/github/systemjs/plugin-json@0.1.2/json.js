'use strict';

/*
  JSON plugin
*/

define({
  translate: function translate(load) {
    if (this.builder) {
      load.metadata.format = 'cjs';
      return 'module.exports = ' + JSON.stringify(JSON.parse(load.source));
    }
  },
  instantiate: function instantiate(load) {
    if (!this.builder) return JSON.parse(load.source);
  }
});
//# sourceMappingURL=json.js.map