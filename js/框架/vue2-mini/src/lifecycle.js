import { patch } from './vdom/patch';
import Watcher from './observer/watcher';

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const prevVnode = vm._vnode;
    vm._vnode = Vnode;
    // 通过vnode渲染出真是node 赋值给$el
    if (!prevVnode) {
      vm.$el = patch(vm.$el, vnode);
    } else {
      // diff
      vm.$el = patch(prevVnode, vnode, vm);
    }
  };
}
// 1. 调用render方法生成vnode -> 执行 vm._render
// 2. 将vnode 渲染成真实DOM -> 执行 vm._update
export function mountComponent(vm, el) {
  vm.el = el;
  callHook(vm, beforeMount);
  let updateComponent = () => {
    vm._update(vm._render());
  };
  new Watcher(
    vm,
    updateComponent,
    () => {
      callHook(vm, 'beforeUpdate');
    },
    true,
  );
  callHook(vm, 'mounted');
}

export function callHook(vm, hook) {
  const handles = vm.options[hook];
  if (handles) {
    for (let i = 0; i < handles.length; i++) {
      handles[i].call(vm);
    }
  }
}
