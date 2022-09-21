// https://juejin.cn/post/6844904102053281806#heading-0

function asyncToGenerator(generator) {
  return () => {
    let gen = generator.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        let { value, done } = generatorResult;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (value) => {
              step('next', value);
            },
            (error) => {
              step('throw', error);
            },
          );
        }
      }
      step('next');
    });
  };
}
