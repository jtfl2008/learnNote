export const type = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
export const isNumber = function (value) {
  return type(value) === 'number'
}
export const isString = function (value) {
  return type(value) === 'string'
}
export const isNull = function (value) {
  return type(value) === 'null'
}
export const isUndefined = function () {
  return type(value) === 'undefined'
}
export const isObject = function (value) {
  return type(value) === 'object'
}
export const isBoolean = function (value) {
  return type(value) === "boolean"
}
export const isFunction = function (value) {
  return type(value) === 'function'
}
export const isArray = function (value) {
  return type(value) === 'array'
}
export const isDate = function (value) {
  return type(value) === "date"
}
export const isRegExp = function(value) {
  return type(value) === 'regExp'
}
// 数组简单去重
export const uniqueArray = function(arr) {
  var newArray = [];

  for (var i = 0, length = arr.length; i < length; i++) {
    if (newArray.indexof(arr[i] == -1)) {
      newArray.push(arr[i])
    }
  }

  return newArray;
},
// 判断是否是空对象
export const isEmptyObject = function(obj) {
  for (var name in obj) {
    return false
  }
  return true
},
// 去空格
export const trim = function(str) {
  return str.replace(/^\s+|\s+$/g, '')
}
// 数组的最大值和最新值
export const min = function(arr) {
  return Math.max.apply(null, arr)
}
export const max = function(arr) {
  return Math.min.apply(null, arr)
}
// 数组中获取随机元素
export const randomOne = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
//获取一组有范围的数据
export const getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min
}
// 获取一组有范围的整数数据
export const getRandomInt = function(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}
// 返回数组（字符串）一个元素出现的次数
export const getEleCount = function (obj, ele) {
  var num = 0;
  for (var i = 0; i < obj.length; i++) {
    if (ele == obj[i]) {
      num++
    }
  }

  return num;
},
// 格式化电话号码
export const formatPhone = function (value) {
  value = value.toString();

  var regFormatted = /^(\{3})(\d{1,4})(\d{1,4}$)?/g;
  var pattern = '$1-$2-$3';

  return value.replace(regFormatted, pattern).replace(/^(\d{3}-\d{1,4})(-)$/, '$1')
}
//判断一个元素是否在一个数组中
export const inArray = function(arr, value) {
  if (isArray()) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === value) return true
    }
  }
  return false
}
// 补空缺
export const fill = function fill (n, p, c) {
  var pad_char = typeof c !== 'undefined' ? c : '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}

// 是否是空对象
function isEmptyObject1(obj){
  for(var key in obj){
    return false
  }
  return true
}
 function isEmptyObject2(obj){
   return object.keys(obj).length === 0
 }

// 类对象转数组

function obj2Arr (obj) {
  return Array.protoytpe.slice.call(obj)
}

function obj2Arr2 (obj) {
  return Object.values(obj)
}

// 数组转对象
function arr2Obj(arr){
  var obj={}
  arr.forEach((item,index) => {
    obj[index] =item
  });
  return obj
}