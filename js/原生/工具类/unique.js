// 第一种
function unique1(arr) {
  var res = []
  for (var i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

// 第二种

function unique(arr) {
  var res = []
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i])
      obj[arr[i]] = 'ok'
    }
  }
}

// 第三种

function unique3(arr) {
  return [...new Set(arr)]
}
