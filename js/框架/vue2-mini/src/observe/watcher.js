import { popTarget, pushTarget } from './dep';
import { queueWatcher } from './scheduler';

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;

    this.deps = [];
    this.depsId = new set();

    this.lazy = !!options.lazy;
    this.dirty = this.lazy;

    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    } else {
      this.getter = function () {
        let path = exprOrFn.split('.');
        let obj = vm;
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]];
        }
        return obj;
      };
    }
    this.value = this.lazy ? undefined : this.get();
  }
  get() {
    pushTarget(this);
    const res = this.getter.call(this.vm);
    popTarget();
    return res;
  }
  addDep() {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
  run() {
    let newVal = this.getter();
    let oldVal = this.value;
    this.value = newVal;
    if (this.user) {
      if (newVal !== oldVal || isObject(newVal)) {
        this.cb.call(this.vm, newVal, oldVal);
      }
    } else {
      this.cb.call(this.vm);
    }
  }
}
