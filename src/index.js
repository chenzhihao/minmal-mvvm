import {reactify} from './observer';

class Vue {
  constructor (options) {
    this.$options = options;
    this.$el = document.querySelector(this.$options.el);
    this._data = options.data;
    this._render = options.render;

    Object.keys(options.data).forEach(key => this._proxy(key));

    reactify(options.data, this._update.bind(this));

    this._render();
  }

  _proxy (key) {
    const self = this;
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return self._data[key]
      },
      set: function proxySetter (val) {
        self._data[key] = val
      }
    })
  }

  _update () {
    this._render();
  }
}

var demo = new Vue({
  el: '#app',
  data: {
    user: {
      name: "name",
      age: "24"
    },
    address: {
      city: "beijing"
    }
  },
  render(){
    this.$el.innerHTML = '<div>' + this.user.name + '</div>';
  }
});

window.demo = demo;