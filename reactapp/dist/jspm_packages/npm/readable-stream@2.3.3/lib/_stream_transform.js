'use strict';

/* */
(function (process) {
  'use strict';

  module.exports = Transform;
  var Duplex = require('./_stream_duplex');
  var util = require('core-util-is');
  util.inherits = require('inherits');
  util.inherits(Transform, Duplex);
  function TransformState(stream) {
    this.afterTransform = function (er, data) {
      return afterTransform(stream, er, data);
    };
    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
    this.writeencoding = null;
  }
  function afterTransform(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb) {
      return stream.emit('error', new Error('write callback called multiple times'));
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data !== null && data !== undefined) stream.push(data);
    cb(er);
    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  }
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);
    Duplex.call(this, options);
    this._transformState = new TransformState(this);
    var stream = this;
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === 'function') this._transform = options.transform;
      if (typeof options.flush === 'function') this._flush = options.flush;
    }
    this.once('prefinish', function () {
      if (typeof this._flush === 'function') this._flush(function (er, data) {
        done(stream, er, data);
      });else done(stream);
    });
  }
  Transform.prototype.push = function (chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function (chunk, encoding, cb) {
    throw new Error('_transform() is not implemented');
  };
  Transform.prototype._write = function (chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function (n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform.prototype._destroy = function (err, cb) {
    var _this = this;
    Duplex.prototype._destroy.call(this, err, function (err2) {
      cb(err2);
      _this.emit('close');
    });
  };
  function done(stream, er, data) {
    if (er) return stream.emit('error', er);
    if (data !== null && data !== undefined) stream.push(data);
    var ws = stream._writableState;
    var ts = stream._transformState;
    if (ws.length) throw new Error('Calling transform done when ws.length != 0');
    if (ts.transforming) throw new Error('Calling transform done when still transforming');
    return stream.push(null);
  }
})(require('process'));
//# sourceMappingURL=_stream_transform.js.map