# mini react

---

源码解析

## webpack 安装

```bash
yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

## server 模块的支持

---

如果想通过 node 运行，请安装下面的模块，进行配置

```bash
yarn add express webpack-dev-middleware -D
```

> 根目录下创建 server.js 添加下面的代码

```js
const express = require("express");
const webpack = require("webpack");
const config = require("./webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");

const complier = webpack(config);
const app = express();

app.use(webpackDevMiddleware(complier, {}));

app.listen(config.devServer.port, () => {
  console.log("server is runing.");
  console.log(`http://localhost:${config.devServer.port}`);
});
```

> 在 package.json 中添加执行命令

```bash
  "server": "node server.js"
  yarm server
```

### webpack-dev-server 命令参数

```bash
// 1. 不会刷新浏览器
webpack-dev-server
//2. 刷新浏览器
webpack-dev-server --inline
//3. 重新加载改变的部分，不会刷新页面
webpack-dev-server --hot
//4. 重新加载改变的部分，HRM失败则刷新页面
webpack-dev-server  --inline --hot
```

### 环境折腾

> 需要将 React，jsx 编译运行起来，需要做以下事情。

1. babel 安装

```bash
yarn add babel babel-cli babel-core babel-loader babel-plugin-transform-runtime babel-preset-env babel-preset-es2015 babel-preset-react babel-preset-react-hmre babel-preset-stage-0
```

2. 配置 babel
   a. 在项目根目录创建.babelrc 文件
   b. 配置内容

```js
{
  "presets": ["es2015", "react", "stage-0"],
  "plugins": ["transform-runtime"]
}
```

3. webpack.config module 配置

```js
{
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ];
  }
}
```

css module 解析

```bash
yarn add postcss-loader
```
