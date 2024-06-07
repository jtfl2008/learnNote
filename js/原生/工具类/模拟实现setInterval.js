// 使用setTimeout模拟实现setInterval
function mySetInterval(fn, delay) {
  let timer = null;
  function interval() {
    fn();
    timer = setTimeout(interval, delay);
  }
  timer = setTimeout(interval, delay);
  return {
    cancel() {
      clearTimeout(timer);
    },
  };
}

// 使用模拟requestAnimationFrame实现setInterval
function mySetInterval(fn, delay) {
  let timer = null;
  let lastTime = performance.now();
  const loop = (currentTime) => {
    const delta = currentTime - lastTime;
    if (delta >= delay) {
      fn();
      lastTime = currentTime;
    }
    timer = requestAnimationFrame(loop);
  };
  timer = requestAnimationFrame((currentTime) => {
    lastTime = currentTime;
    loop(currentTime);
  });
  return () => cancelAnimationFrame(timer);
}
