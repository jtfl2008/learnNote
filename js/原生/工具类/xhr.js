// 参考 http://blog.poetries.top/2016/11/26/Ajax-summary/
// https://segmentfault.com/a/1190000004322487
function ajax(url, success, fail) {
  // 1 创建链接
  var xhr = new XMLHttpRequest()
  // 2 链接服务器
  xhr.open('get', url, true)
  // 3 发送请求
  xhr.send(null)
  // 4 接受响应
  xhr.onReadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      success(xhr.responseText)
    } else {
      fail && fail(xhr.status)
    }
  }
}
