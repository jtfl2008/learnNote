// 冒泡排序： 依次比较，交换相邻元素的大小
var arr = [2, 9, 30, 0, 6]
// 基础
function bubbleSort(arr) {
  var len = arr.length
  for (var i = 0; i < len; i++) {
    // 相邻元素两两比较
    for (var j = 0; j < len - 1 - i; j++) {
      // 元素交换
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
// 优化
function bubbleSort2(arr) {
  var len = arr.length
  for (var i = 0; i < len; i++) {
    var flag = true
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
        noswap = false
      }
    }
    if (flag) {
      break
    }
  }
}
