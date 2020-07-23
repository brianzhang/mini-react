import './style/base.css';
import styles from './style/index.less';
import { React, ReactDOM, mountElement } from './utils/base';
import { LayoutComponent } from './component/layout';
const { Fragment } = React;

const customerComponent = (props) => {
  const { name } = props;
  return (
    <Fragment>
      <h1 className={styles['header']}>Hi, {name}</h1>
    </Fragment>
  )
}

const cCompoent = (
  <LayoutComponent>{customerComponent({ name: 'React!' })}</LayoutComponent>
)

ReactDOM.render(
  cCompoent,
  mountElement,
  function () {
    console.log('组件挂载完毕！')
  }
)