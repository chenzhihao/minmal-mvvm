import {reactify} from './observer';

class Vue {
  constructor (options) {
    this.$options = options;
    this._data = options.data;
    reactify(options.data, this._update.bind(this));
  }

  _update () {
    this.$options.render()
  }
}

var demo = new Vue({
  el: '#demo',
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
    console.log("我要render了")
  }
});

window.demo = demo;

setTimeout(function () {
  demo._data.user.name = 'newName';
}, 3000);