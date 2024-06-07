// 防抖（Debounce）: 当函数被连续调用时，该函数并不执行，只有当其全部停止调用超过一定时间后才执行1次。

// 案例： 上电梯的时候，大家陆陆续续进来，电梯的门不会关上，只有当一段时间都没有人上来，电梯才会关门。

// 基础
function debounce(fn, time) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
}

//  升级 非立即执行

function debounce(fn, time) {
  var timer;
  return function () {
    var _this = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, time);
  };
}

//  立即执行

function debounce(fn, time) {
  let timer;
  return function () {
    let args = arguments;
    let _this = this;
    clearTimeout(timer);
    !timer && fn.apply(_this, args);
    timer = setTimeout(function () {
      timer = null;
    }, time);
  };
}

function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流 (throttle) : 将连续触发的事件稀释成预设频率

// 普通
function throttle(fn, time) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, time);
    }
  };
}
// 立即执行
function throttle(fn, time) {
  let timer;
  return function () {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}

let throttle = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
};

// <!--时间戳法-->
function throttl(fn, delay = 500) {
  let oldtime = Date.now();
  return function (...args) {
    let newtime = Date.now();
    if (newtime - oldtime >= delay) {
      fn.apply(null, args);
      oldtime = Date.now();
    }
  };
}

// <!--优雅组合法-->
function throttled(fn, delay) {
  let timer = null;
  let starttime = Date.now();
  return function () {
    let curTime = Date.now(); // 当前时间
    let remaining = delay - (curTime - starttime); // 从上一次到现在，还剩下多少多余时间
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      starttime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}
