export function patch(oldVnode, vnode, vm) {
  // 没有vm.$el
  if (!oldVnode) {
    return createElement(vnode);
  } else {
    let isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      let oldElm = oldVnode;
      let parentElm = oldElm.parentNode;

      let el = createElm(vnode);
      parentElm.inserBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldVnode);
      return el;
    } else {
      const el = createElm(vnode);
      const oldVnode = vm.$el;
      const parentElm = oldVnode.parentNode;

      parentElm.inserBefore(el, oldVnode.nextSibling);
      parentElm.removeChild(oldVnode);
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
