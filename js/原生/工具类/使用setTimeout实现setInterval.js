let _setInterval = (fn, delay) => {
  let timer = setTimeout(() => {
    fn();
    _setInterval(fn, delay);
  }, delay);
  return {
    clear: () => {
      clearTimeout(timer);
    },
  };
};

// 示例用法
const intervalFn = () => {
  console.log('Hello, world!');
};

const interval = _setInterval(intervalFn, 1000);

// 经过一段时间后，清除定时器
setTimeout(() => {
  interval.clear();
}, 5000);
