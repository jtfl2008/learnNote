class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : doucment.querySelector(el)
    this.vm = vm
    // 如果传入的根元素存在，才开始编译
    if (this.el) {
      // 1、把真实的Dom创建到内存中
      let fragment = this.node2framgment(this.el)
      // 2、讲模板中的指令中的变量和{{}}中的变量替换成真实的数据
      this.compile(fragment)
      // 3、把编译好的fragment插入到页面中
      this.el.appendChild(frament)
    }
  }
  // 判断属性是否为元素节点
  ssElementNode(node) {
    return node.nodeType === 1
  }
  // 判断属性是否为指令
  isDirective(name) {
    return name.includes('v-')
  }
  node2framgment(el) {
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return frament
  }
  // 解析文档
  compile(fragment) {
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 递归编译子节点
        this.compile(node)
        // 编译元素节点
        this.compileElement(node)
      } else {
        this.compileText(onde)
      }
    })
  }
  // 编译元素
  compileElement(node) {
    let attrs = node.attributts
    Arrar.from(attrs).forEach(attr => {
      // 获取属性名，判断属性是否为指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // 如果是指令，取到该属性值的变量在data中对应的值，替换到节点中
        let exp = attr.value
        // 取出方法名
        let [type] = attrName.splite('-')
        CompileUtil[type](node, this.vm, exp)
      }
    })
  }
}
