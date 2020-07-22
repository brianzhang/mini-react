function createRef() {
  const refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

export default createRef;