/**
 * 获取两个数组的交集
 * arr1 = [1,2,3,4]
 * arr2 = [2,3,5,6,7]
 * return [2,3]
 * @param {Array} arr1 
 * @param {Array} arry2 
 * @return {Array} 
 */
function getArrayIntersection(arr1 = [], arr2 = []) {
  arr1 = arr1.sort();
  arr2 = arr2.sort();
  let _temp = [],
    loop_array = (arr1.length < arr2.length) ? arr1 : arr2;
  for (let i = 0; i < loop_array.length; i++) {
    if (arr1[i] === arr2[i]) {
      !_temp.includes(loop_array[i]) && _temp.push(loop_array[i])
    }
  }
  return _temp
}

(() => {
  let arr1 = [1, 2, 3, 4],
    arr2 = [2, 3, 4, 5, 6, 7]
  console.log(getArrayIntersection(arr1, arr2))
})();