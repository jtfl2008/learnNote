function quickSort(arr) {
  var left = []
  var right = []
  var current = arr.splice(0, 1)
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < current) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current, quickSort(rigth))
}
