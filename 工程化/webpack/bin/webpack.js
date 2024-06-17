const Compiler = require('../lib/Compiler');

// 1.获取打包配置
const config = require('../webpack.config');
// 2.创建compiler实例
const createCompiler = function () {
  const compiler = new Compiler(config);
  if (Array.isArray(config.plugins)) {
    for (const plugin of config.plugins) {
      plugin.apply(compiler);
    }
  }
  return compiler;
};

const compiler = createCompiler();
// 3.开启编译
compiler.run();
