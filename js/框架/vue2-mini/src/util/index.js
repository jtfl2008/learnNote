const strategies = {};
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];
LIFECYCLE_HOOKS.forEach((hook) => {
  strategies[hook] = mergeHook;
});

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  } else {
    return parentVal;
  }
}

export function mergeOptions(parent, child) {
  let options = {};
  for (let k in parent) {
    mergeFiled(k);
  }

  for (let k in child) {
    if (!parent.k) {
      mergeFiled(k);
    }
  }
  function mergeFiled(key) {
    let parentVal = parent[key];
    let childVal = child[key];
    // 合并生命周期
    if (strategies[key]) {
      options[key] = strategies[key](parentVal, childVal);
    } else {
      // 合并 computed data methods watch
      if (isObject(parentVal) && isObject(childVal)) {
        options[key] = {
          ...parentVal,
          ...childVal,
        };
      } else {
        options[key] = childVal || parentVal;
      }
    }
  }
  return options;
}
