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
      console.log('Access' + key);
      return val
    },
    set: function (newVal) {
      console.log('Config' + key);
      console.log('New' + key + ' = ' + newVal);
      if (newVal === val) return;
      val = newVal
    }
  });
};

Observer.prototype.walk = function (obj) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return;

    if (typeof obj[key] === 'object') {
      observer(obj[key]);
    }

    this.defineReactive(obj, key, obj[key]);
  }
};

let data = {
  user: {
    name: "name",
    age: "24"
  },
  address: {
    city: "beijing"
  }
};

function observer (value) {
  if (!value || typeof value !== 'object') {
    return
  }
  return new Observer(value);
}

observer(data);