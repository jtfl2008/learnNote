const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.export = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/chunk-[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|s[cs]ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024,
          },
        },
        generator: {
          filename: 'images/[contenthash][ext][query]',
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        use: ['cache-loader', 'thread-loader', 'babel-loader'],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
    },
    extensions: ['.js', '.ts', '.scss', 'vue'],
  },
};
