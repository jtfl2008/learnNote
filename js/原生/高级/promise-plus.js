/*
Promise 实现规范 Promise/A+ 地址: https://promisesaplus.com/
优点：解决异步问题
1. 多个并发异步请求，同时获取结果 -> promise.all
2. 链式异步请求（恶魔金字塔、回调地狱）-> promise.then 链式调用
缺点：
1. 本身还是基于回调函数的形式
2. 无法中断异步处理结果
promise循环引用问题：
    循环引用只能发生在异步情况下(then 的参数函数中 或 定时器中)。此时构造函数才能执行完毕获取到当前promise，然后再引用，发生循环引用
    返回一个新的promise都会执行构造函数（调用then的时候）
promise递归解析问题：
    解析promise即 调用 该promise的 then方法，将外层promise的resolve reject 作为内层promise返回后 触发执行的 then方法的 回调
      then的参数函数返回promise会递归解析，直到返回非promise或被reject。
        底层原理是将then返回的 promise的 resolve和reject 作为参数函数返回的 promise的 then的 回调，
        当参数函数返回的 promise返回后 才触发执行
      构造函数中提供的resolve方法会递归解析，直到返回非promise或被reject（reject不会解析promise）
        底层原理是将自己和reject作为参数promise的then的回调，当参数promise返回后，才触发执行
    因此递归解析的时候
      某内层失败后，外层依次调用其reject方法，也都返回失败
      最内层成功后，外层依次调用其resolve方法，也都返回成功
    注册then回调
      递推的时候不会将then的回调注册到微任务队列尾部
      回归的时候，promise状态改变才会注册到微任务队列尾部，在下次循环执行
promise 异常问题：
    1. 如果没有传递executor函数，直接抛出异常，外面可以同步捕获
    2. 如果在executor函数体中异步代码抛出异常，外面无法同步捕获，只能全局捕获（或者异步代码自己捕获，调用reject通知外面）
    3. 其他情况下promise不会将异常抛到全局，都是返回一个失败的promise
    4. 如果在executor函数体中同步代码抛出异常
      4.1 在resolve或reject之前抛出的异常，被try-catch捕获，返回失败的promise
      4.2 在resolve或reject接收的参数函数中抛出异常，被try-catch捕获，返回失败的promise
      4.3 在resolve或reject之后抛出的异常，被try-catch捕获，不影响promise的状态
    5. 如果在then回调函数中抛出异常
      5.1 被then中的try-catch捕获，返回失败的promise
    6. thenable对象
      6.1 如果在其then参数函数resolve和reject之前抛异常，都会被try-catch捕获，返回失败的promise
          e.g. Promise.resolve、构造函数中的resolve、then的resolvePromise
      6.2 如果在其then参数函数resolve和reject之后抛异常，会被try-catch捕获，但是不改变promise的状态
promise then事件循环问题：
    调用then就会将then的参数函数注册到微任务队列末尾，在下一轮事件循环才会执行（延迟一轮执行）
promise reject 的处理
    最终处理结果要返回一个 resolved promise。否则会报 UnhandledPromiseRejectionWarning，
    1. 异步函数后面使用 catch() 异步捕获并处理异常
    2. 使用 async/await 和 try-catch 同步捕获并处理异常
    DeprecationWarning: Unhandled promise rejections are deprecated.
    In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code
promise——有限状态机的理解
    1. 有限状态机（Finite State Machine - FSM）简称状态机，一种数学模型，表示有限个状态及在有限状态之间的转移和动作等行为
       关键要素：状态集、初始状态、状态转移函数、[最终状态]
    2. Promise状态机分析
       状态集：Fulfilled、Rejected、Pending
       初始状态：Pending
       状态转移函数：executor 函数中传入的 resolve、reject 函数
Promise/A+ 测试问题
    1. 注掉规范方法中的日志
    2. 注掉非规范中的功能（3个地方）
*/

// https://github.com/wenyuan/my-promise/blob/main/fully-promise/MyPromise.js
// https://www.cnblogs.com/echoyya/p/14695457.html
// https://github.com/pycyyaxyy/Promise
const PENDING = pending;
const FULFILLED = fulfilled;
const REJECTED = rejected;

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = value;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });

    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    } else if (value instanceof Object && 'then' in value) {
      return new Promise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }
    return new Promise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  finally(callback) {
    return this.then(callback, callback);
  }

  static all(promises) {
    return new promises((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let counter = 0;
        if (promises.length === 0) return resolve(promises);
        promises.forEach((item, index) => {
          Promise.resolve(item).then((value) => {
            counter++;
            result[index] = value;
            if (counter === promises.length) {
              resolve(result);
            }
          });
        });
      }
    });
  }

  static allSettle(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = [];
        let counter = 0;
        if (promises.length === 0) return resolve(promises);
        promises.forEach((item, index) => {
          Promise.resolve(item).then(
            (value) => {
              counter++;
              result[index] = {
                status: 'fulfilled',
                value,
              };
              if (counter === promises.length) {
                resolve(result);
              }
            },
            (reason) => {
              counter++;
              result[index] = {
                status: 'rejected',
                reason,
              };
              if (counter === promises.length) {
                resolve(result);
              }
            },
          );
        });
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static any(promise) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let errors = [];
        let counter = 0;
        if (promises.length === 0)
          return reject(new AggregateError([], 'All promises were rejected'));
        promises.forEach(
          (item) => {
            Promise.resolve(item).then((value) => {
              resolve(value);
            });
          },
          (reason) => {
            counter++;
            errors.push(reason);
            if (counter === promises.length) {
              reject(new AggregateError(errors, 'All promises were rejected'));
            }
          },
        );
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach((item) => {
            Promise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject(new TypeError('Argument is not iterable'));
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<MyPromise>'),
    );
  }
  let called = false;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      if (typeof x.then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, x, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}
