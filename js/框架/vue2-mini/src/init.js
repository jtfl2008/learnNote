import { initState } from './state';
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;
    callHook(vm, 'beforeCreate');
    // 初始化状态 initProps, initMethod initData initComputed initWatch
    initState(vm);
    callHook(vm, 'created');
    if (vm.$options.el) {
      vm.$mount(vm.options.el);
    }
  };
  Vue.prototype.$mount = function (el) {};
}
