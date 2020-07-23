const path = require('path');
const webpack = require('webpack');
const appName = require('./package.json').name;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

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
    port: 8001,
    host: 'localhost'
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
        use: [
          'style-loader',
          // 'css-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          // 'less-loader'
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('autoprefixer')(),
                require('cssnano')()
              ]
            }
          }
        ]
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
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}