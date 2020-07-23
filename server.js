const path = require('path');
const open = require('open'); // 用于打开浏览器
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config'); // webpack配置文件
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const complier = webpack(config); // 注册配置
const app = express();

app.use(express.static(path.join(__dirname, './static')))
app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}));

// 将编译器挂载给webpack hot middleware
app.use(webpackHotMiddleware(complier, {
  headers: 500
}))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"))
})

var server = app.listen(config.devServer.port, config.devServer.host, () => {
  const { address, port } = server.address()
  console.log('server is runing.')
  console.log(`http://${address}:${port}`);
  // 是否自动打开浏览器
  if (config.devServer.open) {
    open(`http://${address}:${port}`)
  }
})
