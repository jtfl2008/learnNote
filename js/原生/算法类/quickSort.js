function quickSort(arr) {
  if (arr.length <= 1) {
    // 递归出口
    return arr
  }
  var left = []
  var right = []
  var current = arr.splice(0, 1) //注意splice后，数组长度少了一个
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current, quickSort(right))
}
