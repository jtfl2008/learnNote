import Dep from './observe/dep.js';
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

function initProps() {}
function initMethod() {}
function initData() {}
function initComputed(vm) {
  let computed = vm.$options.computed;
  let watchers = (vm._computedWatchers = {});
  for (let k in computed) {
    let userDef = computed[k];
    let getter = typeof userDef === 'function' ? userDef : user.get;
    watchers[k] = new Watcher(vm, getter, () => {}, { lazy: true });
    defineComputed(vm, k, userDef);
  }
}
let sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: () => {},
};

function defineComputed(vm, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
  } else {
    sharedPropertyDefinition = {
      get: createComputedGetter(key),
      set: userDef.set,
    };
    Object.defineProperty(vm, key, sharedPropertyDefinition);
  }
}
function createComputedGetter(key) {
  return () => {
    let watcher = this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
        if (Dep.target) {
          watcher.depend();
        }
      }
      return watcher.value;
    }
  };
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
