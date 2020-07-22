const didWarnStateUpdateForUnmountedComponent = {};

/**
 * 警告错误提示
 * @param {*} publicInstance 实例
 * @param {*} callerName 名称
 */
function warnNoop(publicInstance, callerName) {
  if (__DEV__) {
    const constructor = publicInstance.constructor;
    const componentName = (constructor && (constructor.displayName || constructor.name)) || 'ReactClass';
    const warningKey = `${componentName}.${callerName}`;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    console.error(`
      Can't call %s on a component that is not yet mounted. \n
      This is a no-op, but it might indicate a bug in your application. \n
      Instead, assign to 'this.state' directly or define a 'state = {};' \n
      class property with the desired state in the %s component.
    `, callerName, componentName)
  }
};

const ReactNoopUpdateQueue = {
  /**
   * 
   * @param {ReactClass} publicInstance 
   * @return {boolean}
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false
  },
  /**
   * 
   * @param {ReactClass} publicInstance
   * @param {?function} callback 
   * @param {?string} callerName 
   */
  enqueueForceUpdate: function (
    publicInstance,
    callback,
    callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },
  /**
   * 
   * @param {ReactClass} publicInstance 
   * @param {Object} completeState 
   * @param {?function} callback 
   * @param {?string} callerName 
   */
  enqueueReplaceState: function (
    publicInstance,
    completeState,
    callback,
    callerName) {
    warnNoop(publicInstance, 'replaceState');
  },
  /**
   * 
   * @param {*} publicInstance 
   * @param {*} partialState 
   * @param {*} callback 
   * @param {*} callerName 
   */
  enqueueSetState: function (
    publicInstance,
    partialState,
    callback,
    callerName) {
    warnNoop(publicInstance, 'setState');
  }
}

export default ReactNoopUpdateQueue;