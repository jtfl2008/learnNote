export function patch(oldVnode, vnode, vm) {
  // 1. 第一次渲染【组件元素】时；没有$el，也没有oldVnode
  if (!oldVnode) {
    return createElement(vnode);
  } else {
    let isRealElement = oldVnode.nodeType;
    // 2. 如果是初次渲染元素节点
    if (isRealElement) {
      let oldElm = oldVnode;
      let parentElm = oldElm.parentNode;

      let el = createElm(vnode);
      parentElm.inserBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldVnode);
      return el;
    } else {
      // 3. 如果是更新视图
      // 3.1 标签名不一致，直接删除掉老的，替换新的
      if (oldVnode.tag !== vnode.tag) {
        oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      }
      // 3.2 如果新旧节点是一个文本节点（新节点是一个文本节点，则旧节点一定是文本节点，否则两者tag不同，会走上面的判断)
      if (!vnode.tag) {
        if (oldVnode.text !== vnode.text) {
          oldVnode.el.textContent = vnode.text;
        }
      }
      // 3.3 不符合上面两种，代表标签名一致，并且不是文本节点
      let el = vnode.el === oldVnode.el;
      updateProperties(vnode, oldVnode.data);
      let oldCh = oldVnode.children || [];
      let newCh = vnode.children || [];
      // 3.3.1. 新老都存在子节点
      if (oldCh.length > 0 && newCh.length > 0) {
        updateChildren(el, oldCh, newCh);
      } else if (oldCh) {
        // 3.3.2 老的有儿子，新的没有
        el.innerHTML = '';
      } else if (newCh.length) {
        // 3.3.3 新的有儿子，老的没儿子
        for (let i = 0; i < newCh.length; i++) {
          let child = newCh[i];
          el.appendChild(createElm(child));
        }
      }
    }
  }
}

function createElement(vnode) {
  let { tag, data, key, children, text } = vnode;
  // 元素节点，自定义组件
  if (typeof tag === 'string') {
    // 组件
    if (createComponent(vnode)) {
      return vnode.component.$el;
    }
    // 元素
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    // 文本节点
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

// 创建组件真是dom
function createComponent(vnode) {
  // 创建组件实例
  let i = vnode.data;
  // 相当于执行 vnode.data.hook.init(vnode)
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  if (vnode.componentInstance) {
    return true;
  }
}

// 解析vnode的data属性， 映射到真是dom
function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.data || {};
  let el = vnode.el;

  for (let k in oldProps) {
    if (!newProps[k]) {
      el.removeAttribute(k);
    }
  }
  //  对style样式做特殊处理 如果新的没有 需要把老的style值置为空
  let newStyle = newProps.newStye || {};
  let oldStyle = oldStyle.newStye || {};

  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = '';
    }
  }

  // 遍历新的属性 进行增加操作
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}
// 双指针的方式，对比新旧子节点
function updateChildren(parent, oldCh, newCh) {
  let oldStartIndex = 0; //老儿子的起始下标
  let oldStartVnode = oldCh[0]; //老儿子的第一个节点
  let oldEndIndex = oldCh.length - 1; //老儿子的结束下标
  let oldEndVnode = oldCh[oldEndIndex]; //老儿子的结束节点

  let newStartIndex = 0; // 新儿子的，同上
  let newStartVnode = newCh[0];
  let newEndIndex = newCh.length - 1;
  let newEndVnode = newCh[newEndIndex];

  function makeIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
      if (item.key) {
        map[item.key] = index;
      }
    });
    return map;
  }
  let keysMap = makeIndexByKey(oldCh);

  // 只有当新老儿子的双指标的起始位置不大于结束位置的时候，才能循环；
  // 一方的开始位置大于结束位置，说明该方循环完毕，需要结束循环

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIndex];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      // 头和头比较
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIndex];
      newStartVnode = newCh[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // 尾和尾比较
      path(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // 头和尾比较
      patch(oldStartVnode, newEndVnode);
      parent.inserBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      oldStartVnode = oldCh[++oldStartIndex];
      newEndVnode = newCh[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // 尾和头比较
      patch(oldEndVnode, newStartVnode);
      parent.inserBefore(oldEndVnode.el, oldStartVnode.el);
      oldEndVnode = oldCh[--oldEndIndex];
      newStartVnode = newCh[++newStartIndex];
    } else {
      let moveIndex = keysMap[newStartVnode.key];
      if (!moveIndex) {
        parent.inserBefore(createElm(newStartVnode), oldStartVnode.el);
      } else {
        let moveVnode = oldCh[moveIndex];
        oldCh[moveIndex] = null;
        parent.inserBefore(moveVnode.el, oldStartVnode.el);
        path(moveVnode, newStartVnode);
      }
      newStartVnode = newCh[++newStartIndex];
    }
  }

  // 如果老节点循环完毕了，但是新节点还有；证明新节点需要被添加到头部或者尾部
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      const anchor =
        newCh[newEndIndex + 1] == null ? null : newCh[newEndIndex + 1].el;
      parent.insertBefore(createElm(newCh[i]), anchor);
    }
  }

  // 如果新节点循环完毕，老节点还有；证明老的节点需要直接被删除
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldCh[i];
      parent.removeChild(child.el);
    }
  }
}
