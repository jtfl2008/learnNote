import { initState } from './state';
import { compileToFunctions } from './compiler/index';
import { callHook, mountComponent } from './lifecycle';
import { mergeOptions } from './util/index';
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
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      if (template) {
        const render = compileToFunctions(template);
        options.render = render;
      }
    }
    return mountComponent(vm, el);
  };
}
