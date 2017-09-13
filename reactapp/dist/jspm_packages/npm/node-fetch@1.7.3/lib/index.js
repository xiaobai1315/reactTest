'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* */
(function (Buffer, process) {
  'use strict';

  Object.defineProperty(exports, '__esModule', { value: true });
  var BUFFER = Symbol('buffer');
  var TYPE = Symbol('type');
  var CLOSED = Symbol('closed');

  var Blob = function () {
    function Blob() {
      _classCallCheck(this, Blob);

      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Blob',
        writable: false,
        enumerable: false,
        configurable: true
      });
      this[CLOSED] = false;
      this[TYPE] = '';
      var blobParts = arguments[0];
      var options = arguments[1];
      var buffers = [];
      if (blobParts) {
        var a = blobParts;
        var length = Number(a.length);
        for (var i = 0; i < length; i++) {
          var element = a[i];
          var buffer = void 0;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element[BUFFER];
          } else {
            buffer = Buffer.from(typeof element === 'string' ? element : String(element));
          }
          buffers.push(buffer);
        }
      }
      this[BUFFER] = Buffer.concat(buffers);
      var type = options && options.type !== undefined && String(options.type).toLowerCase();
      if (type && !/[^\u0020-\u007E]/.test(type)) {
        this[TYPE] = type;
      }
    }

    _createClass(Blob, [{
      key: 'slice',
      value: function slice() {
        var size = this.size;
        var start = arguments[0];
        var end = arguments[1];
        var relativeStart = void 0,
            relativeEnd = void 0;
        if (start === undefined) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === undefined) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        var span = Math.max(relativeEnd - relativeStart, 0);
        var buffer = this[BUFFER];
        var slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        var blob = new Blob([], { type: arguments[2] });
        blob[BUFFER] = slicedBuffer;
        blob[CLOSED] = this[CLOSED];
        return blob;
      }
    }, {
      key: 'close',
      value: function close() {
        this[CLOSED] = true;
      }
    }, {
      key: 'size',
      get: function get() {
        return this[CLOSED] ? 0 : this[BUFFER].length;
      }
    }, {
      key: 'type',
      get: function get() {
        return this[TYPE];
      }
    }, {
      key: 'isClosed',
      get: function get() {
        return this[CLOSED];
      }
    }]);

    return Blob;
  }();

  Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: 'BlobPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    if (systemError) {
      this.code = this.errno = systemError.code;
    }
    Error.captureStackTrace(this, this.constructor);
  }
  FetchError.prototype = Object.create(Error.prototype);
  FetchError.prototype.constructor = FetchError;
  FetchError.prototype.name = 'FetchError';
  var Stream = require('stream');
  var _require$1 = require('stream');
  var PassThrough$1 = _require$1.PassThrough;
  var DISTURBED = Symbol('disturbed');
  var convert = void 0;
  try {
    convert = require('encoding').convert;
  } catch (e) {}
  function Body(body) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$size = _ref.size;
    var size = _ref$size === undefined ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    var timeout = _ref$timeout === undefined ? 0 : _ref$timeout;
    if (body == null) {
      body = null;
    } else if (typeof body === 'string') {} else if (isURLSearchParams(body)) {} else if (body instanceof Blob) {} else if (Buffer.isBuffer(body)) {} else if (body instanceof Stream) {} else {
      body = String(body);
    }
    this.body = body;
    this[DISTURBED] = false;
    this.size = size;
    this.timeout = timeout;
  }
  Body.prototype = {
    get bodyUsed() {
      return this[DISTURBED];
    },
    arrayBuffer: function arrayBuffer() {
      return consumeBody.call(this).then(function (buf) {
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
      });
    },
    blob: function blob() {
      var ct = this.headers && this.headers.get('content-type') || '';
      return consumeBody.call(this).then(function (buf) {
        return Object.assign(new Blob([], { type: ct.toLowerCase() }), _defineProperty({}, BUFFER, buf));
      });
    },
    json: function json() {
      var _this = this;
      return consumeBody.call(this).then(function (buffer) {
        try {
          return JSON.parse(buffer.toString());
        } catch (err) {
          return Body.Promise.reject(new FetchError('invalid json response body at ' + _this.url + ' reason: ' + err.message, 'invalid-json'));
        }
      });
    },
    text: function text() {
      return consumeBody.call(this).then(function (buffer) {
        return buffer.toString();
      });
    },
    buffer: function buffer() {
      return consumeBody.call(this);
    },
    textConverted: function textConverted() {
      var _this2 = this;
      return consumeBody.call(this).then(function (buffer) {
        return convertBody(buffer, _this2.headers);
      });
    }
  };
  Body.mixIn = function (proto) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(Body.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var name = _step.value;

        if (!(name in proto)) {
          var desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  function consumeBody(body) {
    var _this3 = this;
    if (this[DISTURBED]) {
      return Body.Promise.reject(new Error('body used already for: ' + this.url));
    }
    this[DISTURBED] = true;
    if (this.body === null) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    if (typeof this.body === 'string') {
      return Body.Promise.resolve(Buffer.from(this.body));
    }
    if (this.body instanceof Blob) {
      return Body.Promise.resolve(this.body[BUFFER]);
    }
    if (Buffer.isBuffer(this.body)) {
      return Body.Promise.resolve(this.body);
    }
    if (!(this.body instanceof Stream)) {
      return Body.Promise.resolve(Buffer.alloc(0));
    }
    var accum = [];
    var accumBytes = 0;
    var abort = false;
    return new Body.Promise(function (resolve, reject) {
      var resTimeout = void 0;
      if (_this3.timeout) {
        resTimeout = setTimeout(function () {
          abort = true;
          reject(new FetchError('Response timeout while trying to fetch ' + _this3.url + ' (over ' + _this3.timeout + 'ms)', 'body-timeout'));
        }, _this3.timeout);
      }
      _this3.body.on('error', function (err) {
        reject(new FetchError('Invalid response body while trying to fetch ' + _this3.url + ': ' + err.message, 'system', err));
      });
      _this3.body.on('data', function (chunk) {
        if (abort || chunk === null) {
          return;
        }
        if (_this3.size && accumBytes + chunk.length > _this3.size) {
          abort = true;
          reject(new FetchError('content size at ' + _this3.url + ' over limit: ' + _this3.size, 'max-size'));
          return;
        }
        accumBytes += chunk.length;
        accum.push(chunk);
      });
      _this3.body.on('end', function () {
        if (abort) {
          return;
        }
        clearTimeout(resTimeout);
        resolve(Buffer.concat(accum));
      });
    });
  }
  function convertBody(buffer, headers) {
    if (typeof convert !== 'function') {
      throw new Error('The package `encoding` must be installed to use the textConverted() function');
    }
    var ct = headers.get('content-type');
    var charset = 'utf-8';
    var res = void 0,
        str = void 0;
    if (ct) {
      res = /charset=([^;]*)/i.exec(ct);
    }
    str = buffer.slice(0, 1024).toString();
    if (!res && str) {
      res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    if (!res && str) {
      res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
      if (res) {
        res = /charset=(.*)/i.exec(res.pop());
      }
    }
    if (!res && str) {
      res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    if (res) {
      charset = res.pop();
      if (charset === 'gb2312' || charset === 'gbk') {
        charset = 'gb18030';
      }
    }
    return convert(buffer, 'UTF-8', charset).toString();
  }
  function isURLSearchParams(obj) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
      return false;
    }
    return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
  }
  function _clone(instance) {
    var p1 = void 0,
        p2 = void 0;
    var body = instance.body;
    if (instance.bodyUsed) {
      throw new Error('cannot clone body after it is used');
    }
    if (body instanceof Stream && typeof body.getBoundary !== 'function') {
      p1 = new PassThrough$1();
      p2 = new PassThrough$1();
      body.pipe(p1);
      body.pipe(p2);
      instance.body = p1;
      body = p2;
    }
    return body;
  }
  function extractContentType(instance) {
    var body = instance.body;
    if (body === null) {
      return null;
    } else if (typeof body === 'string') {
      return 'text/plain;charset=UTF-8';
    } else if (isURLSearchParams(body)) {
      return 'application/x-www-form-urlencoded;charset=UTF-8';
    } else if (body instanceof Blob) {
      return body.type || null;
    } else if (Buffer.isBuffer(body)) {
      return null;
    } else if (typeof body.getBoundary === 'function') {
      return 'multipart/form-data;boundary=' + body.getBoundary();
    } else {
      return null;
    }
  }
  function getTotalBytes(instance) {
    var body = instance.body;
    if (body === null) {
      return 0;
    } else if (typeof body === 'string') {
      return Buffer.byteLength(body);
    } else if (isURLSearchParams(body)) {
      return Buffer.byteLength(String(body));
    } else if (body instanceof Blob) {
      return body.size;
    } else if (Buffer.isBuffer(body)) {
      return body.length;
    } else if (body && typeof body.getLengthSync === 'function') {
      if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
        return body.getLengthSync();
      }
      return null;
    } else {
      return null;
    }
  }
  function writeToStream(dest, instance) {
    var body = instance.body;
    if (body === null) {
      dest.end();
    } else if (typeof body === 'string') {
      dest.write(body);
      dest.end();
    } else if (isURLSearchParams(body)) {
      dest.write(Buffer.from(String(body)));
      dest.end();
    } else if (body instanceof Blob) {
      dest.write(body[BUFFER]);
      dest.end();
    } else if (Buffer.isBuffer(body)) {
      dest.write(body);
      dest.end();
    } else {
      body.pipe(dest);
    }
  }
  Body.Promise = global.Promise;
  function isValidTokenChar(ch) {
    if (ch >= 94 && ch <= 122) return true;
    if (ch >= 65 && ch <= 90) return true;
    if (ch === 45) return true;
    if (ch >= 48 && ch <= 57) return true;
    if (ch === 34 || ch === 40 || ch === 41 || ch === 44) return false;
    if (ch >= 33 && ch <= 46) return true;
    if (ch === 124 || ch === 126) return true;
    return false;
  }
  function checkIsHttpToken(val) {
    if (typeof val !== 'string' || val.length === 0) return false;
    if (!isValidTokenChar(val.charCodeAt(0))) return false;
    var len = val.length;
    if (len > 1) {
      if (!isValidTokenChar(val.charCodeAt(1))) return false;
      if (len > 2) {
        if (!isValidTokenChar(val.charCodeAt(2))) return false;
        if (len > 3) {
          if (!isValidTokenChar(val.charCodeAt(3))) return false;
          for (var i = 4; i < len; i++) {
            if (!isValidTokenChar(val.charCodeAt(i))) return false;
          }
        }
      }
    }
    return true;
  }
  function checkInvalidHeaderChar(val) {
    val += '';
    if (val.length < 1) return false;
    var c = val.charCodeAt(0);
    if (c <= 31 && c !== 9 || c > 255 || c === 127) return true;
    if (val.length < 2) return false;
    c = val.charCodeAt(1);
    if (c <= 31 && c !== 9 || c > 255 || c === 127) return true;
    if (val.length < 3) return false;
    c = val.charCodeAt(2);
    if (c <= 31 && c !== 9 || c > 255 || c === 127) return true;
    for (var i = 3; i < val.length; ++i) {
      c = val.charCodeAt(i);
      if (c <= 31 && c !== 9 || c > 255 || c === 127) return true;
    }
    return false;
  }
  function sanitizeName(name) {
    name += '';
    if (!checkIsHttpToken(name)) {
      throw new TypeError(name + ' is not a legal HTTP header name');
    }
    return name.toLowerCase();
  }
  function sanitizeValue(value) {
    value += '';
    if (checkInvalidHeaderChar(value)) {
      throw new TypeError(value + ' is not a legal HTTP header value');
    }
    return value;
  }
  var MAP = Symbol('map');

  var Headers = function () {
    function Headers() {
      _classCallCheck(this, Headers);

      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      this[MAP] = Object.create(null);
      if (init instanceof Headers) {
        var rawHeaders = init.raw();
        var headerNames = Object.keys(rawHeaders);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = headerNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var headerName = _step2.value;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = rawHeaders[headerName][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var value = _step3.value;

                this.append(headerName, value);
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return;
      }
      if (init == null) {} else if ((typeof init === 'undefined' ? 'undefined' : _typeof(init)) === 'object') {
        var method = init[Symbol.iterator];
        if (method != null) {
          if (typeof method !== 'function') {
            throw new TypeError('Header pairs must be iterable');
          }
          var pairs = [];
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = init[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var pair = _step4.value;

              if ((typeof pair === 'undefined' ? 'undefined' : _typeof(pair)) !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
                throw new TypeError('Each header pair must be iterable');
              }
              pairs.push(Array.from(pair));
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = pairs[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _pair = _step5.value;

              if (_pair.length !== 2) {
                throw new TypeError('Each header pair must be a name/value tuple');
              }
              this.append(_pair[0], _pair[1]);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        } else {
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = Object.keys(init)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var key = _step6.value;

              var _value = init[key];
              this.append(key, _value);
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } else {
        throw new TypeError('Provided initializer must be an object');
      }
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Headers',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }

    _createClass(Headers, [{
      key: 'get',
      value: function get(name) {
        var list = this[MAP][sanitizeName(name)];
        if (!list) {
          return null;
        }
        return list.join(', ');
      }
    }, {
      key: 'forEach',
      value: function forEach(callback) {
        var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var pairs = getHeaderPairs(this);
        var i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          var name = _pairs$i[0],
              value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaderPairs(this);
          i++;
        }
      }
    }, {
      key: 'set',
      value: function set(name, value) {
        this[MAP][sanitizeName(name)] = [sanitizeValue(value)];
      }
    }, {
      key: 'append',
      value: function append(name, value) {
        if (!this.has(name)) {
          this.set(name, value);
          return;
        }
        this[MAP][sanitizeName(name)].push(sanitizeValue(value));
      }
    }, {
      key: 'has',
      value: function has(name) {
        return !!this[MAP][sanitizeName(name)];
      }
    }, {
      key: 'delete',
      value: function _delete(name) {
        delete this[MAP][sanitizeName(name)];
      }
    }, {
      key: 'raw',
      value: function raw() {
        return this[MAP];
      }
    }, {
      key: 'keys',
      value: function keys() {
        return createHeadersIterator(this, 'key');
      }
    }, {
      key: 'values',
      value: function values() {
        return createHeadersIterator(this, 'value');
      }
    }, {
      key: Symbol.iterator,
      value: function value() {
        return createHeadersIterator(this, 'key+value');
      }
    }]);

    return Headers;
  }();

  Headers.prototype.entries = Headers.prototype[Symbol.iterator];
  Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: 'HeadersPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function getHeaderPairs(headers, kind) {
    var keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === 'key' ? function (k) {
      return [k];
    } : function (k) {
      return [k, headers.get(k)];
    });
  }
  var INTERNAL = Symbol('internal');
  function createHeadersIterator(target, kind) {
    var iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
      target: target,
      kind: kind,
      index: 0
    };
    return iterator;
  }
  var HeadersIteratorPrototype = Object.setPrototypeOf({
    next: function next() {
      if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
        throw new TypeError('Value of `this` is not a HeadersIterator');
      }
      var _INTERNAL = this[INTERNAL];
      var target = _INTERNAL.target,
          kind = _INTERNAL.kind,
          index = _INTERNAL.index;
      var values = getHeaderPairs(target, kind);
      var len = values.length;
      if (index >= len) {
        return {
          value: undefined,
          done: true
        };
      }
      var pair = values[index];
      this[INTERNAL].index = index + 1;
      var result = void 0;
      if (kind === 'key') {
        result = pair[0];
      } else if (kind === 'value') {
        result = pair[1];
      } else {
        result = pair;
      }
      return {
        value: result,
        done: false
      };
    }
  }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
  Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: 'HeadersIterator',
    writable: false,
    enumerable: false,
    configurable: true
  });
  var _require$2 = require('http');
  var STATUS_CODES = _require$2.STATUS_CODES;

  var Response = function () {
    function Response() {
      _classCallCheck(this, Response);

      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Body.call(this, body, opts);
      this.url = opts.url;
      this.status = opts.status || 200;
      this.statusText = opts.statusText || STATUS_CODES[this.status];
      this.headers = new Headers(opts.headers);
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Response',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }

    _createClass(Response, [{
      key: 'clone',
      value: function clone() {
        return new Response(_clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok
        });
      }
    }, {
      key: 'ok',
      get: function get() {
        return this.status >= 200 && this.status < 300;
      }
    }]);

    return Response;
  }();

  Body.mixIn(Response.prototype);
  Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: 'ResponsePrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  var _require$3 = require('url');
  var format_url = _require$3.format;
  var parse_url = _require$3.parse;
  var PARSED_URL = Symbol('url');

  var Request = function () {
    function Request(input) {
      _classCallCheck(this, Request);

      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var parsedURL = void 0;
      if (!(input instanceof Request)) {
        if (input && input.href) {
          parsedURL = parse_url(input.href);
        } else {
          parsedURL = parse_url('' + input);
        }
        input = {};
      } else {
        parsedURL = parse_url(input.url);
      }
      var method = init.method || input.method || 'GET';
      if ((init.body != null || input instanceof Request && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
        throw new TypeError('Request with GET/HEAD method cannot have body');
      }
      var inputBody = init.body != null ? init.body : input instanceof Request && input.body !== null ? _clone(input) : null;
      Body.call(this, inputBody, {
        timeout: init.timeout || input.timeout || 0,
        size: init.size || input.size || 0
      });
      this.method = method.toUpperCase();
      this.redirect = init.redirect || input.redirect || 'follow';
      this.headers = new Headers(init.headers || input.headers || {});
      if (init.body != null) {
        var contentType = extractContentType(this);
        if (contentType !== null && !this.headers.has('Content-Type')) {
          this.headers.append('Content-Type', contentType);
        }
      }
      this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
      this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
      this.counter = init.counter || input.counter || 0;
      this.agent = init.agent || input.agent;
      this[PARSED_URL] = parsedURL;
      Object.defineProperty(this, Symbol.toStringTag, {
        value: 'Request',
        writable: false,
        enumerable: false,
        configurable: true
      });
    }

    _createClass(Request, [{
      key: 'clone',
      value: function clone() {
        return new Request(this);
      }
    }, {
      key: 'url',
      get: function get() {
        return format_url(this[PARSED_URL]);
      }
    }]);

    return Request;
  }();

  Body.mixIn(Request.prototype);
  Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: 'RequestPrototype',
    writable: false,
    enumerable: false,
    configurable: true
  });
  function getNodeRequestOptions(request) {
    var parsedURL = request[PARSED_URL];
    var headers = new Headers(request.headers);
    if (!headers.has('Accept')) {
      headers.set('Accept', '*/*');
    }
    if (!parsedURL.protocol || !parsedURL.hostname) {
      throw new TypeError('Only absolute URLs are supported');
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
      throw new TypeError('Only HTTP(S) protocols are supported');
    }
    var contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
      contentLengthValue = '0';
    }
    if (request.body != null) {
      var totalBytes = getTotalBytes(request);
      if (typeof totalBytes === 'number') {
        contentLengthValue = String(totalBytes);
      }
    }
    if (contentLengthValue) {
      headers.set('Content-Length', contentLengthValue);
    }
    if (!headers.has('User-Agent')) {
      headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
    }
    if (request.compress) {
      headers.set('Accept-Encoding', 'gzip,deflate');
    }
    if (!headers.has('Connection') && !request.agent) {
      headers.set('Connection', 'close');
    }
    return Object.assign({}, parsedURL, {
      method: request.method,
      headers: headers.raw(),
      agent: request.agent
    });
  }
  var http = require('http');
  var https = require('https');
  var _require = require('stream');
  var PassThrough = _require.PassThrough;
  var _require2 = require('url');
  var resolve_url = _require2.resolve;
  var zlib = require('zlib');
  function fetch(url, opts) {
    if (!fetch.Promise) {
      throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
    }
    Body.Promise = fetch.Promise;
    return new fetch.Promise(function (resolve, reject) {
      var request = new Request(url, opts);
      var options = getNodeRequestOptions(request);
      var send = (options.protocol === 'https:' ? https : http).request;
      if (options.headers.host) {
        options.headers.host = options.headers.host[0];
      }
      var req = send(options);
      var reqTimeout = void 0;
      if (request.timeout) {
        req.once('socket', function (socket) {
          reqTimeout = setTimeout(function () {
            req.abort();
            reject(new FetchError('network timeout at: ' + request.url, 'request-timeout'));
          }, request.timeout);
        });
      }
      req.on('error', function (err) {
        clearTimeout(reqTimeout);
        reject(new FetchError('request to ' + request.url + ' failed, reason: ' + err.message, 'system', err));
      });
      req.on('response', function (res) {
        clearTimeout(reqTimeout);
        if (fetch.isRedirect(res.statusCode) && request.redirect !== 'manual') {
          if (request.redirect === 'error') {
            reject(new FetchError('redirect mode is set to error: ' + request.url, 'no-redirect'));
            return;
          }
          if (request.counter >= request.follow) {
            reject(new FetchError('maximum redirect reached at: ' + request.url, 'max-redirect'));
            return;
          }
          if (!res.headers.location) {
            reject(new FetchError('redirect location header missing at: ' + request.url, 'invalid-redirect'));
            return;
          }
          if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
            request.method = 'GET';
            request.body = null;
            request.headers.delete('content-length');
          }
          request.counter++;
          resolve(fetch(resolve_url(request.url, res.headers.location), request));
          return;
        }
        var headers = new Headers();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = Object.keys(res.headers)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var name = _step7.value;

            if (Array.isArray(res.headers[name])) {
              var _iteratorNormalCompletion8 = true;
              var _didIteratorError8 = false;
              var _iteratorError8 = undefined;

              try {
                for (var _iterator8 = res.headers[name][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                  var val = _step8.value;

                  headers.append(name, val);
                }
              } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion8 && _iterator8.return) {
                    _iterator8.return();
                  }
                } finally {
                  if (_didIteratorError8) {
                    throw _iteratorError8;
                  }
                }
              }
            } else {
              headers.append(name, res.headers[name]);
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        if (request.redirect === 'manual' && headers.has('location')) {
          headers.set('location', resolve_url(request.url, headers.get('location')));
        }
        var body = res.pipe(new PassThrough());
        var response_options = {
          url: request.url,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: headers,
          size: request.size,
          timeout: request.timeout
        };
        var codings = headers.get('Content-Encoding');
        if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
          resolve(new Response(body, response_options));
          return;
        }
        var zlibOptions = {
          flush: zlib.Z_SYNC_FLUSH,
          finishFlush: zlib.Z_SYNC_FLUSH
        };
        if (codings == 'gzip' || codings == 'x-gzip') {
          body = body.pipe(zlib.createGunzip(zlibOptions));
          resolve(new Response(body, response_options));
          return;
        }
        if (codings == 'deflate' || codings == 'x-deflate') {
          var raw = res.pipe(new PassThrough());
          raw.once('data', function (chunk) {
            if ((chunk[0] & 0x0F) === 0x08) {
              body = body.pipe(zlib.createInflate());
            } else {
              body = body.pipe(zlib.createInflateRaw());
            }
            resolve(new Response(body, response_options));
          });
          return;
        }
        resolve(new Response(body, response_options));
      });
      writeToStream(req, request);
    });
  }
  fetch.isRedirect = function (code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  fetch.Promise = global.Promise;
  module.exports = exports = fetch;
  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.FetchError = FetchError;
})(require('buffer').Buffer, require('process'));
//# sourceMappingURL=index.js.map