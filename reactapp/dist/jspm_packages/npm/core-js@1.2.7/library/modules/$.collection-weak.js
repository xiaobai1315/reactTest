/* */
'use strict';

var hide = require('./$.hide'),
    redefineAll = require('./$.redefine-all'),
    anObject = require('./$.an-object'),
    isObject = require('./$.is-object'),
    strictNew = require('./$.strict-new'),
    forOf = require('./$.for-of'),
    createArrayMethod = require('./$.array-methods'),
    $has = require('./$.has'),
    WEAK = require('./$.uid')('weak'),
    isExtensible = Object.isExtensible || isObject,
    arrayFind = createArrayMethod(5),
    arrayFindIndex = createArrayMethod(6),
    id = 0;
var frozenStore = function frozenStore(that) {
  return that._l || (that._l = new FrozenStore());
};
var FrozenStore = function FrozenStore() {
  this.a = [];
};
var findFrozen = function findFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function get(key) {
    var entry = findFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};
module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      strictNew(that, C, NAME);
      that._i = id++;
      that._l = undefined;
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        if (!isExtensible(key)) return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      has: function has(key) {
        if (!isObject(key)) return false;
        if (!isExtensible(key)) return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    if (!isExtensible(anObject(key))) {
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    }
    return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
//# sourceMappingURL=$.collection-weak.js.map