const path = require('path');
const webpack = require('webpack');
const appName = require('./package.json').name;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
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
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
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