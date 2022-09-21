import { arrayMethods } from './array';
import Dep from './dep';
class Observe {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    });

    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }
  observeArray(data) {
    data.forEach((item) => {
      observe(item);
    });
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, value) {
  let childOb = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newVal) {
      if (newVal === value) return;
      observe(newVal);
      value = newVal;
      dep.notify();
    },
  });
}

function dependArray(value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

export function observe(data) {
  if (!(typeof data === 'object' && data !== null)) return;
  if (data.__ob__) return;
  return new observe(data);
}
