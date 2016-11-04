/**
 * This constructor actually do convert data to reactive,
 * The returned value is useless currently.
 * @param data
 * @constructor
 */
function Observer (data, cb) {
  this.value = data;
  this.walk(data, cb);
}

Observer.prototype.defineReactive = function (obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('Access: ' + key);
      return val;
    },
    set: function (newVal) {
      console.log('Config on: ' + key + ', old value: ' + val);
      console.log('New: ' + key + ' : ' + newVal);
      if (newVal === val) return;
      cb(val, newVal);
      val = newVal;
      reactify(val, cb);
    }
  });
};

Observer.prototype.walk = function (obj, cb) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return;

    if (typeof obj[key] === 'object') {
      reactify(obj[key], cb);
    }

    this.defineReactive(obj, key, obj[key], cb);
  }
};

export function reactify (value, cb) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value, cb);
}

