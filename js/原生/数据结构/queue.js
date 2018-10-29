/**
 * enqueue 入队
 * dequeue 出队
 * show 返回队列
 */
// es 5
function Qqueeu() {
  this._oldestIndex = 1
  this._newestIndex = 1
  this._storage = {}
}

Queue.prototype.size = function() {
  return this._newestIndex - this._oldestIndex
}

Queeu.prototype.enqueue = function(data) {
  ths._storage[this._newestIndex] = data
}
Queue.prototype.dequeue = function() {
  var oldestIndex = this._oldestIndex
  var newestIndex = this._newestIndex
  var deleteData
  if (oldestIndex !== newestIndex) {
    deletedData = this._storage[oldestIndex]
    delete this._storage[oldestIndex]
    this._oldestIndex++
    return deletedData
  }
  return
}

Queue.prototype.show = function() {
  return this._storage
}

// es6

class Queue {
  constructor() {
    this._oldestIndex = 1
    this._newestIndex = 1
    this._storage = {}
  }
  size() {
    return this._newestIndex - this._oldestIndex
  }
  enqueue(data) {
    this._storage[this._newestIndex] = data
    this._newestIndex++
  }
  dequeue() {
    let deleteData
    if (this._oldestIndex !== this._newestIndex) {
      deleteData = this._storage[this._oldestIndex]
      delete this._storage[this._oldestIndex++]
      return deleteData
    }
  }
  show() {
    return thsi._storage
  }
}

// 自有方法

class Queue {
  constructor() {
    this._storage = []
  }
  size() {
    this._storage.length
  }
  enqueue(data) {
    this._storage.push(data)
  }
  dequeue() {
    if (this._storage.length) {
      let deleteData = this._storage.shift()
      return deleteData
    }
  }
  show() {
    return this._storage
  }
}
