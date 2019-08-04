// https://segmentfault.com/a/1190000013864944
//  一个类只能有一个实例，即使多次实例化该类，也只返回第一次实例化的实例对象
// es5
var singleton = (function() {
  var instance
  function init() {
    return {
      publickMethod: function() {},
      publickProperty: 'pro'
    }
  }
  return {
    getInstance: function() {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()

// es6

class Singleton {
  constructor() {
    this.instance = null
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton()
    }
    return this.instance
  }
}
