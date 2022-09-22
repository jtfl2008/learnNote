import { observe } from './observe/index.js';
import Watcher from './observe/watcher.js';

export function initState(vm) {
  const options = vm.$options;
  if (options.props) {
    initProps(vm);
  }
  if (options.method) {
    initMethod(vm);
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch(vm);
  }

  function initWatch() {
    let watch = vm.$options.watch;
    for (let k in watch) {
      let handlers = watch[k];
    }
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => {
        createWatcher(vm, k, handler);
      });
    } else {
      createWatcher(vm, k, handler);
    }
  }
}

function createWatcher(vm, key, handler, options = {}) {
  if (typeof handler === 'object') {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(key, handler, options);
}

export function stateMixin(Vue) {
  Vue.prototype.$watch = function (exprOrFn, cb, options) {
    let vm = this;
    let watcher = new Watcher(vm, exprOrFn, cb, { ...options, user: true });
    if (options.immediate) {
      cb(watcher.value);
    }
  };
}
