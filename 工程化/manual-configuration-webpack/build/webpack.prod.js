const { merge } = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const { web } = require('webpack');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new webpack.DefinePlugin({
      process: {
        evn: {
          NOOE_DEV: JSON.stringify('production'),
          // 这里可以定义你的环境变量
          // VUE_APP_URL: JSON.stringify('https://xxx.com')
        },
      },
    }),
  ],
});
