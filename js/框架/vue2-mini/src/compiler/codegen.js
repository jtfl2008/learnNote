import { ELEMENT_TYPE } from './parse';

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配花括号 {{  }}；捕获花括号里面的内容

function gen(node) {
  if (node.type === ELEMENT_TYPE) {
    return generator(node);
  } else {
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`;
    }

    let lastIndex = (defaultTagRE.lastIndex = 0);
    let tokens = [];
    let match, index;

    while ((match = defaultTagRE.exec(text))) {
      index = match.index;

      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}

// 处理attrs/props属性：将[{name: 'class', value: 'home'}, {name: 'style', value: "font-size:12px;color:red"}]转化成 "class:"home",style:{"font-size":"12px","color":"red"}"
function getProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {};
      attr.value.split(';').forEach((item) => {
        let [key, value] = item.split(':');
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}

function getChildren(el) {
  const children = el.children;
  if (children) {
    return `${children.map((c) => gen(c)).join(',')}`;
  }
}

export function generate(ast) {
  let children = getChildren(ast);
  let code = `_c('${ast.tag}',${
    ast.attrs.length ? `${genProps(ast.attrs)}` : 'undefined'
  }${children ? `,${children}` : ''})`;
  return code;
}
