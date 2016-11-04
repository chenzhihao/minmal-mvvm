/**
 * This constructor actually do convert data to reactive,
 * The returned value is useless currently.
 * @param data
 * @constructor
 */
function Observer (data) {
  this.value = data;
  this.walk(data);
}

Observer.prototype.defineReactive = function (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('Access: ' + key);
      return val
    },
    set: function (newVal) {
      console.log('Config on: ' + key);
      console.log('New: ' + key + ' = ' + newVal);
      if (newVal === val) return;
      val = newVal;
      reactify(val);
    }
  });
};

Observer.prototype.walk = function (obj) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return;

    if (typeof obj[key] === 'object') {
      reactify(obj[key]);
    }

    this.defineReactive(obj, key, obj[key]);
  }
};

export function reactify (value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value);
}

