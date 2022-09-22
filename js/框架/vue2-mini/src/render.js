export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;

    const vnode = render.call(vm);
    return vnode;
  };
  // 元素
  Vue.prototype._c = function (...args) {
    return createElement(this, ...args);
  };
  // 文本
  Vue.prototype._v = function (text) {
    return createTextNode(this, text);
  };
  // 字符串
  Vue.prototype._s = function (val) {
    return val === null
      ? ''
      : typeof val === 'object'
      ? JSON.stringify(val)
      : val;
  };
}
