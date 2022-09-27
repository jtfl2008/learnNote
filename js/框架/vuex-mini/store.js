import ModuleCollection from './module/module-collection';

let forEachValue = (obj, cb) => {
  Object.keys(obj).forEach((key) => cb(obj[key], key));
};
const installModule = (store, path, module, rootState) => {
  let namespace = store._modules.getNamespace(path);
  // store => [], store.modules => ['a'], store.modules.modules => ['a', 'c']
  if (path.length > 0) {
    // 是子模块
    const parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current];
    }, rootState);

    // vue-router是使用Vue.util.defineReactive，所以这里写成Vue.util.defineReactive(parent, path[path.length - 1], module.state)也可以
    // 因为目标就是要把模块定义成响应式的，源码路径：/src/core/util
    // 这里不用set也能实现响应式，因为下面会把 state 设置到创建的 Vue 上来实现响应式，不过源码中就是用的set
    Vue.set(parent, path[path.length - 1], module.state);
    // parent[path[path.length - 1]] = module.state // 但是这样操作子模块不是响应式的
  }

  module.forEachMutation((mutation, key) => {
    store.mutations[namespace + key] = store.mutations[namespace + key] || [];
    store.mutations[namespace + key].push((payload) =>
      mutation.call(store, module.state, payload),
    );
  });
  module.forEachAction((action, key) => {
    store.actions[namespace + key] = store.actions[namespace + key] || [];
    store.actions[namespace + key].push((payload) =>
      action.call(store, store, payload),
    );
  });
  module.forEachChildren((childModule, key) => {
    installModule(store, path.concat(key), childModule, rootState); // childModule.state
  });
  // 没用namespace，则所有模块的getters默认都会合并到一个对象里，都是直接getters.xxx即可，而不用getters.a.xxx
  module.forEachGetters((getterFn, key) => {
    store.wrapGetters[namespace + key] = () =>
      getterFn.call(store, module.state);
  });
};
export class Store {
  constructor(options) {
    this._modules = new ModuleCollection();
    this.getters = {};
    this.wrapGetters = {};
    this.mutations = {};
    this.actions = {};
    installModule(this, [], this._modules.root, state);
    resetStoreVM(this, state);
  }
  get state() {
    return this._vm._data.$$state;
  }
  commit = (type, payload) => {
    if (this.mutations[type]) {
      this.mutations[type].forEach((fn) => fn(payload));
    }
  };
  dispatch = (type, payload) => {
    if (this.actions[type]) {
      this.actions[type].forEach((fn) => fn(payload));
    }
  };
}
function resetStoreVM(store, state) {
  const computed = {};
  forEachValue(store.wrapGetters, (fn, key) => {
    // 将是所有的属性放到computed中
    computed[key] = fn;
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
    });
  });

  // 用户肯定是先使用 Vue.use，再进行 new Vue.Store({...})，所以这里的 Vue 已经是可以拿到构造函数的了
  // 必须放到f forEachValue 后面，确保 computed 已经有值
  store._vm = new Vue({
    data: {
      // Vue中不会对 $开头的属性进行代理操作（不会挂到_vm上进行代理）
      // 但是其属性依旧会被代理到（页面获取时依然会被收集依赖），因为我们不会直接操作state，而是操作state.xxx，性能优化
      $$state: state,
    },
    computed,
  });
}
