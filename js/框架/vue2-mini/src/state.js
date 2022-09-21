import { observe } from './observe/index.js';

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
}
