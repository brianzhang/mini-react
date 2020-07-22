const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
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
app.listen(config.devServer.port, () => {
  console.log('server is runing.')
  console.log(`http://localhost:${config.devServer.port}`);
})
