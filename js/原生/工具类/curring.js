// 把接受多个参数的函数变化成接受一个单一参数的函数，并且返回接收余下的参数并且返回结果的函数

function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    var innerArgs = Array.prototype.slice.call(arguments)
    var resArgs = args.concat(innerArgs)
    return fn.apply(null, resArgs)
  }
}

// bind 函数

function bind(fn, ctx) {
  var args = Array.prototype.slice.call(arguments, 2)
  return function() {
    var innerArgs = Array.prototype.slice.call(arguments)
    var resArgs = args.concat(innerArgs)
    return fn.apply(ctx, resArgs)
  }
}
