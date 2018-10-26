/* 
MVVM
Compile (模板编译)
Observer (数据劫持)
Wather(数据监听)
Dep(发布订阅)
*/

class MVVM {
  constroctor(options) {
    // 先把el和data挂载到MVVM实例上
    this.$el = options.el
    this.$data = options.data
    // 如果有要编译的模板就开始编译
    if (this.$el) {
      // 数据劫持，把对象所有的属性添加到 get和set
      new Observer(this.$data)
      // 将数据代理到实例上
      this.proxyData(this.$data)
      // 用数据和元素进行编译
      new Compile(this.el, this)
    }
  }
  // 代理数据
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    })
  }
}

/* 
  在new一个MVVM的时候，在参数options中传入了一个dom的跟元素节点和数据data并挂在了当前的MVVM实例上。
  
*/
