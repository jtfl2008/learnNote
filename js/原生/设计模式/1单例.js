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
