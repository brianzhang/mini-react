const path = require('path');
const webpack = require('webpack');
const appName = require('./package.json').name;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    // 入口文件
    path.resolve(__dirname, './src/index.js'),
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=500&reload=true"
  ],
  output: {
    publicPath: '/',
    filename: `${appName}-bundle.js`, // 编译输出文件
    path: path.resolve(__dirname, 'dist') // 编译输出目录
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), //开发运行时生成目录
    hot: true,
    open: true,
    port: 8001
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}