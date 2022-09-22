import { popTarget, pushTarget } from './dep';

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;

    this.deps = [];
    this.depsId = new set();

    this.getter = exprOrFn;
    this.get();
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
    this.get();
  }
}
