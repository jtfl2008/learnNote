/**
 * push 入栈
 * pop 出栈
 * show 返回栈
 */
// es5
function Stack() {
  this._size = 0
  this._storage = {}
}

Stack.prototype.push = function() {
  var size = ++this._size
  this._storage[size] = data
}
Stack.prototype.pop = function() {
  var size = this._size
  var deleteData
  if (size) {
    deleteData = this._storage[size]
    delete this._storage[size]
    this._size--
    return deleteData
  }
}

Stack.prototype.show = function() {
  var len = 1
  while (len <= this._size) {
    console.log(this._storage)
    len++
  }
}

// es6

class Stack {
  constructor() {
    this._size = 0
    this._storage = {}
  }
  push(data) {
    let size = ++this._size
    this._storage[size] = data
  }
  pop() {
    if (this._size) {
      let deleteData = this._storage[this._size]
      delete this._storage[this._size--]
      return deleteData
    }
  }
  show() {
    console.log(this._storage)
  }
}

// 自有函数

class Stack {
  constrctor() {
    this._storage = {}
  }
  push() {
    this._storage.push(data)
  }
  pop() {
    if (this._storage.length) {
      return this._storage.pop()
    }
  }
  show() {
    console.log(this._storage)
  }
}
