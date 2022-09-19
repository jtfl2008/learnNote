// 创建一个 EventEmitter 类
// 在该类上创建一个事件中心（Map）
// on 方法用来把函数 fn 都加到事件中心中（订阅者注册事件到调度中心）
// emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应事件中心中的函数（发布者发布事件到调度中心，调度中心处理代码）
// off 方法可以根据 event 值取消订阅（取消订阅）
// once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）
// 注册一个 newListener 用于监听新的事件订阅

// 作者：是阿恒呀
// 链接：https://juejin.cn/post/6985156199192723487
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [cb];
    }
    this.events[event].push(cb);
    return this;
  }
  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter((item) => {
        return item !== cb;
      });
    }
  }
  once(event, cb) {
    function fn() {
      cb();
      this.off(event, fn);
    }
    this.on(event, fn);
  }
  emit(event, ...rest) {
    this.events[event] &&
      this.events[event].forEach((fn) => fn.apply(this, rest));
  }
}
