// 源码编译文件导入
import React from '../../../react-master/build/node_modules/react/cjs/react.development';
import ReactDOM from '../../../react-master/build/node_modules/react-dom/cjs/react-dom.development'
import { ROOT_ELEMENT } from './config';

const mountElement = ((id = '#base') => {
  return document.querySelector(id);
})(ROOT_ELEMENT)

export {
  React,
  ReactDOM,
  mountElement
}