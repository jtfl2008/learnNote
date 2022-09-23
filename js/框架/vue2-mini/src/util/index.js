import { ASSETS_TYPE } from '../global-api/const';
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

ASSETS_TYPE.forEach((type) => {
  strategies[type + 's'] = mergeAssets;
});
// components、directives、filters的合并策略
function mergeAssets(parentVal, childVal) {
  let res = Object.create(parentVal);
  if (childVal) {
    for (let k in childVal) {
      res[k] = childVal[k];
    }
  }
  return res;
}

// 属性合并
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

// 判断val是否是对象/数组
export function isObject(val) {
  return typeof val === 'object' && val !== null;
}

// 判断是否是函数
export function isFunction(val) {
  return typeof val === 'function';
}

// 判断tagName是否是普通标签
export function isReservedTag(tagName) {
  // 定义常见标签
  let str =
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot';
  let obj = {};
  str.split(',').forEach((tag) => {
    obj[tag] = true;
  });
  return obj[tagName];
}
