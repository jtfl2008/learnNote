const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    open: true,
    // 开启热更新
    hot: true,
    devtool: 'eval-cheap-module-source-map',
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        evn: {
          NOOE_DEV: JSON.stringify('development'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
  ],
});
