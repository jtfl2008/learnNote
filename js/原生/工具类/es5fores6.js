// map方法

// 循环遍历数组，并返回一个新数组
// 回调函数一共接收3个参数，分别是：「正在处理的当前元素的值、正在处理的当前元素的索引、正在遍历的集合对象」
Array.prototype.map = function (fn) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(fn(this[i], i, this));
  }
  return arr;
};

// filter方法

// 该方法返回一个由通过测试的元素组成的新数组，如果没有通过测试的元素，则返回一个空数组
// 回调函数一共接收3个参数，同 map 方法一样。分别是：「正在处理的当前元素的值、正在处理的当前元素的索引、正在遍历的集合对象」

Array.prototype.filter = function (fn) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && arr.push(this[i]);
  }
};

// some方法
// 在数组中查找元素，如果找到一个符合条件的元素就返回true，如果所有元素都不符合条件就返回 false；
// 回调函数一共接收3个参数，同 map 方法一样。分别是：「正在处理的当前元素的值、正在处理的当前元素的索引、正在遍历的集合对象」。

Array.prototype.some = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      return true;
    }
  }
  return false;
};

// every方法

// 检测一个数组中的元素是否都能符合条件，都符合条件返回true，有一个不符合则返回 false
// 如果收到一个空数组，此方法在任何情况下都会返回 true
// 回调函数一共接收3个参数，同 map 方法一样。分别是：「正在处理的当前元素的值、正在处理的当前元素的索引、正在遍历的集合对象」
Array.prototype.every = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      return false;
    }
  }
  return true;
};

// find方法

// 在数组中查找元素，如果找到符合条件的元素就返回这个元素，如果没有符合条件的元素就返回 undefined，且找到后不会继续查找
// 回调函数一共接收3个参数，同 map 方法一样。分别是：「正在处理的当前元素的值、正在处理的当前元素的索引、正在遍历的集合对象」

Array.prototype.find = function (fn) {
  for (let i = 0; i < this.length; i++) {
    if (this[i]) return this[i];
  }
};

// reduce方法

// 初始值不传时的特殊处理：会默认用数组中的第一个元素
// 函数的返回结果会作为下一次循环的 prev
// 回调函数一共接收4个参数，分别是「上一次调用回调时返回的值、正在处理的元素、正在处理的元素的索引，正在遍历的集合对象」

Array.prototype.reduce = function (fn, initValue) {
  let result = initValue || this[0];
  for (let i = initValue ? 0 : 1; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }
  return result;
};
