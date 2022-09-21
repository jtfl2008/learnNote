let oldArrayPrototype = Array.prototype;
export let arrayMethods = Object.create(oldArrayPrototype);

let methods = ['push', 'pop', 'unshift', 'shift', 'sort', 'reverse', 'splice'];

methods.forEach((method) => {
  // 在原型上重写数组方法
  arrayMethods[method] = function (...arg) {
    const result = oldArrayPrototype[method].call(this, ...arg);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = slice(2);
      default:
        break;
    }
    // 如果数组方法有新增数据，对新增数据进行拦截
    if (inserted) ob.observeArray(inserted);
    ob.dep.notify();
    return result;
  };
});
