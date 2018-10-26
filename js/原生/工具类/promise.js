// https://juejin.im/post/5bcedb78e51d457b7d135746
class Promise {
  constructor(executor) {
    // 初始化state
    this.state = 'pending'
    // 成功的值
    this.value = undefined
    // 失败的值
    this.reason = undefined
    // 异步操作，需要将所有then中的成功回调保存
    this.onResolvedCallBacks = []
    // 异步操作，需要将所有的then中的失败回调保存
    this.onRejectedCallBacks = []

    let resolve = value => {
      // 监测state状态是否改变，如果改变了调用就会失败
      if (this.state === 'pending') {
        // resolve 调用后，state改变为成功状态
        this.state = 'fulfilled'
        // 存成功的值
        this.value = value
        // 执行成功的回调函数
        this.onResolvedCallBacks.forEach(fn => fn)
      }
    }
    let reject = reason => {
      if (this.state === 'pending') {
        this.state === 'rejected'
        ths.reason = reasont
        this.onRejectedCallBacks.forEach(fn => fn)
      }
    }
    // 如果exec执行报错，直接执行reject
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
    if (this.state === 'pending') {
      this.onResolvedCallBacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallBacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
