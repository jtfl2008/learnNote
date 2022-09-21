// 将template匹配不同的正则（开始标签正则、结束标签正则、标签关闭正则、标签属性正则等），匹配成功则交由不同别的方法处理（返回tagName、attributes、text等）
// 在处理方法handleStartTag中，返回一个描述元素的对象（包含tag、type、children、parent、attrs等属性）将他们push到一个栈；
// 在处理方法handleEndTag中，将元素pop出栈，并设置它及上一个元素的parent、children关系；
// 在处理方法handleChars中，设置文本为currentParent的children元素；
// 解析完一部分，template就截取掉一部分，然后循环继续匹配，直到template为空；
// 通过进出栈操作，以及parent、children关系，建立一个树状结构（通过parent、children描述）

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //匹配标签名；形如 abc-123
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //匹配特殊标签;形如 abc:234,前面的abc:可有可无；获取标签名；
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 匹配标签开头；形如  <  ；捕获里面的标签名
const startTagClose = /^\s*(\/?)>/; // 匹配标签结尾，形如 >、/>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配结束标签 如 </abc-123> 捕获里面的标签名
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性  形如 id="app"
export function parse(template) {
  let root;
  let currentParent;
  let stack = [];
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;
  // 创建AST节点
  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: ELEMENT_TYPE,
      children: [],
      attrs,
      parent: null,
    };
  }
  // 对开始标签进行处理
  function handleStartTag({ tagName, attrs }) {
    let element = createASTElement(tagName, attrs);
    if (!root) root = element;
    currentParent = element;
    stack.push(element);
  }
  // 对结束标签进行处理
  function handleEndTag(tagName) {
    let element = stack.pop();
    currentParent = stack[stack.length - 1];
    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }
  // 对文本进行处理
  function handleCharts(text) {
    text = text.replace(/\s/, '');
    if (text) {
      currentParent.children.push({
        type: TEXT_TYPE,
        text,
      });
    }
  }
  /**
   * 递归解析template，进行初步处理
   * 解析开始标签，将结果{tagName, attrs} 交给 handleStartTag 处理
   * 解析结束标签，将结果 tagName 交给 handleEndTag 处理
   * 解析文本门将结果 text 交给 handleChars 处理
   */
  while (template) {
    let textEnd = template.indexOf('<');
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        handleStartTag(startTagMatch);
        continue;
      }
      const endTagMatch = template.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        handleEndTag(endTagMatch[1]);
        continue;
      }
    }

    let text;
    if (textEnd >= 0) {
      text = template.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      handleCharts(text);
    }
  }
  // 解析开始标签
  function parseStartTag() {
    const start = template.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };

      advance(start[0].length);

      let end, attrs;

      while (
        !(end === template.match(startTagClose)) &&
        (attr = template.match(attribute))
      ) {
        advance(attr[0].length);
        attr = {
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        };

        match.attrs.push(attrs);
      }

      if (end) {
        advance(1);
        return match;
      }
    }
  }
  function advance(n) {
    template = template.substring(n);
  }
  return root;
}
