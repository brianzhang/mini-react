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


let list = [
  1,
  [10, 20, 30, 40, [
    11, 21, 31, 41, 51, [
      12, 22, 32, 42, 52, 62,
      [13, 23, 33, 43, 53, 53, [
        124, 314, 314, 344, 144, 314, 234
      ]]
    ]
  ], 50, 60, 70],
  2, 3, 4, 5
];
(function () {
  let args = arguments[0],
    runCount = 0;
  function getVal(args) {
    runCount += 1
    args.forEach(function (i, y) {
      if (typeof i === 'object') getVal.call(this, i);
      console.log(`runCount: ${runCount} - ${y}-: ${i}`)
    })
  }
  getVal(args)
})(list);

let trees = [
  {
    name: 'node1',
    children: [
      {
        name: 'node2',
        children: [
          {
            name: 'node3',
            children: [
              {
                name: 'node4',
                children: [
                  {
                    name: 'node4',
                    children: [
                      {
                        name: 'node5',
                        children: [
                          {
                            name: 'node5',
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]


function getTree(trees, tabs = 0) {
  trees && trees.forEach(function (i, y) {
    let tb = new Array(tabs + y + 1).fill(' ')
    console.log(`${tb.join()}|_<div>${i.name}</div>`)
    getTree.apply(this, [i.children, tabs + y + 1])
  })
}
getTree(trees)

var classA = function () {
  this.name = arguments[0]
  this.arg = arguments[1]
  console.log(this.name, this.arg)
  this.constructor = function () {

  }
}

classA.constructor = function () {
  this.name = arguments[0]
  this.arg = arguments[1]
  this.size = arguments[2]
  console.log(this.name, this.arg, this.size)
}

new classA(1, 2, 3)
