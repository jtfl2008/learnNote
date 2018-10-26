class Observer {
  constructor(data) {
    this.Observer(data)
  }
  // 添加数据监听
  observer(data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.observer(data[key])
    })
  }
  // 添加数据响应
  defineReactive(object, key, value) {
    let _this = this
    let dep = new Dep()

    object.defineReactive(object, key, {
      enumerable: true,
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        if (newValue !== value) {
          _this.observer(newValue)
          value = newValue
          dep.notify()
        }
      }
    })
  }
}
