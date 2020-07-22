// import _ from 'lodash';
import styles from './style/index.less';
import { React, ReactDOM } from './utils/base';
const { Fragment } = React;

const customerComponent = (props) => {
  const { name } = props;
  return (
    <Fragment>
      <h1 className='header'>Hi, {name}</h1>
    </Fragment>
  )
}

ReactDOM.render(
  customerComponent({ name: 'brian' }),
  document.getElementById('root'),
  function () {
    console.log(arguments)
  }
)