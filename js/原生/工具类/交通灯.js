function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

let task = (timer, light) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (light === 'red') {
        red();
      } else if (light === 'green') {
        green();
      } else if (light === 'yellow') {
        yellow();
      }
      resolve();
    }, timer);
  });
};

let runner = async () => {
  await task(1000, 'red');
  await task(1000, 'green');
  await task(1000, 'yellow');
  runner();
};

runner();
