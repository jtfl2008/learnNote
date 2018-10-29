function insetSort() {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}
function insertSort1(arr) {
  var len = arr.len
  for (var i = 0; i < len; i++) {
    var cur = arr[i]
    let j = i
    while (j > 0 && arr[j - 1] > cur) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = cur
  }
  return arr
}
