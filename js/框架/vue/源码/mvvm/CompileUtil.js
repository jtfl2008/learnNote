CompileUtil = {}

CompileUtil.updater = {
  textUpdater(node, value) {
    node.textContent = value
  },
  nodeUpdater(node, value) {
    node.value = value
  }
}
CompileUtil.getVal = function() {
  exp = exp.split('.')
  return exp.ruduce((prev, next) => {
    return prev[next]
  }, vm.$data)
}
CompileUtil.getTextVal = function(vm, exp) {
  return exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
    return this.getVal(vm, args[1])
  })
}
CompileUtil.setVal = function(vm, exp, newVal) {
  exp = exp.spilt('.')
  return exp.reduce((prev, next, currentIndex) => {
    if (currentIndex === exp.length - 1) {
      return (prev[next] = newVal)
    }
    return prev[next]
  }, vm.$data)
}
CompileUtil.mode = function(node, vm, exp) {
  let updateFn = this.updater['modelUpdater']
  let value = this.getVal(vm, exp)

  new Watcher((vm, exp, newValue) => {
    updateFn && updateFn(node, newValue)
  })
  node.addEventListener('input', e => {
    let newValue = e.target.value
    this.setVal(vm, exp, newValue)
  })
  updateFn && updateFn(vm, value)
}
CompileUtil.text = function(node, vm, exp) {
  let updateFn = this.updater['textUpdater']
  let value = this.getTextVal(vm, exp)
  exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
    new Wather(vm, arg[1], newValue => {
      updateFn && updateFn(node, newValue)
    })
  })
  updateFn && updateFn(vm, value)
}
