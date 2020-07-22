import inveriant from './shared/inveriant';
import ReactNoopUpdateQueue from './ReactNoopUpdateQueue';

const emptyObject = {};
if (__DEV__) {
  /**
   * Object.freeze 方法冻结一个对象，一个被冻结的对象再也不能被修改；
   */
  Object.freeze(emptyObject);
}
/**
 * Component 组件构造器
 * @param {*} props 
 * @param {*} context 
 * @param {?ReactNoopUpdateQueue} updater
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * 
 */
Component.prototype.setState = function (particalState, callback) {
  inveriant(
    typeof particalState === 'object' ||
    typeof particalState === 'function' ||
    particalState == null,
    `
      setState(...): takes an object of state variables to update or a \n
      function which returns an object of state variables.
    `
  )
  /**
   * 这里调用的enqueueSetState来源于ReactNoopUpdateQueue实例
   */
  this.updater.enqueueSetState(this, callback, 'setState')
}

/**
 * @param {?function} callback
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}

if (__DEV__) {
  const deprecatedAPIs = {
    isMounted: [
      'isMounted',
      'Instead, make sure to clean up subscriptions and pending requests in ' +
      'componentWillUnmount to prevent memory leaks.',
    ],
    replaceState: [
      'replaceState',
      'Refactor your code to use setState instead (see ' +
      'https://github.com/facebook/react/issues/3236).',
    ]
  }
  /**
   * 
   * @param {*} methodName 
   * @param {*} info 
   * @TODO 这是干啥的，暂时还不清楚，继续往后看
   */
  const defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        console.warn(
          '%s(...) is deprecated in plain JavaScript React classes. %s',
          info[0],
          info[1]
        );
        return undefined;
      }
    })
  }
  for (const fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}
/**
 * @TODO ComponentDummy 这个是干啥的？
 */
function ComponentDummy() { };
ComponentDummy.prototype = Component.prototype; //继承Component 属性

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true; //用来区分pureReactComponent，就这一个标示，好像没其他

export {
  Component,
  PureComponent
}