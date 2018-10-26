function deepClone(obj) {
  var isArray = Array.isArray(obj)
  var cloneObj = isArray ? [] : {}
  for (var key in obj) {
    cloneObj[key] =
      typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return cloneObj
}
