// https://github.com/amandakelake/blog/issues/16
// call 和 apply 都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 this 的指向
// 步骤
// 1、将要执行的函数设置为对象的属性
// 2、取出参数
// 3、执行函数
// 4、删除该函数

// 实现call
Function.prototype.newCall = function(ctx) {
  // 取得传入的对象
  // 不传第一个参数 默认为window
  var ctx = ctx || window

  ctx.fn = this
  var args = [...arguments].slice(1)
  var result = ctx.fn(...args)
  delete ctx.fn
  return result
}

// 实现apply
Function.prototype.newApply = function(ctx) {
  var ctx = ctx || window
  ctx.fn = this
  var result

  if (arguments[1]) {
    result = ctx.fn(...arguments[1])
  } else {
    result = ctx.fn()
  }
  delete ctx.fn
  return result
}

Function.prototype.newBind = function(ctx) {
  var _this = this
  var args = [...arguments].slice(1)
  return function fn() {
    if (this instanceof fn) {
      return new _this(args, ...arguments)
    }
    return _this.apply(ctx, args.concat(arguments))
  }
}

// 三者区别

// 相同点
// 1,都是用来改变函数的this对象的指向的；
// 2,第一个参数都是this要指向的对象，也就是想指定的上下文；
// 3,都可以利用后续参数传参；
// 不同
// 1,bind是返回对应函数，便于稍后调用；
// 2,apply、call则是立即调用，call直接传入每个参数，apply以数组的形式传入参数（可以理解记忆为 a开头即为arr => 数组
