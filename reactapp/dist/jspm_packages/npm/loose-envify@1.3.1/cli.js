'use strict';

/* */
(function (process) {
  'use strict';

  var looseEnvify = require('./index');
  var fs = require('fs');
  if (process.argv[2]) {
    fs.createReadStream(process.argv[2], { encoding: 'utf8' }).pipe(looseEnvify(process.argv[2])).pipe(process.stdout);
  } else {
    process.stdin.resume();
    process.stdin.pipe(looseEnvify(__filename)).pipe(process.stdout);
  }
})(require('process'));
//# sourceMappingURL=cli.js.map