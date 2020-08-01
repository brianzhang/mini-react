// 创建对象
function inherit(p) {
  if (p == null) throw TypeError()
  if (Object.create) {
    return Object.create(p)
  }
  let t = typeof p
  if (t !== 'object' && t !== 'function') throw TypeError()
  function f() { }
  f.prototype = p
  return new f();
}

// 对象拷贝
function extend(o, p) {
  for (let i in p) {
    o[i] = p[i]
  }
  return o;
}

let t1 = { a: 1, b: 2, c: 3, d: 4 },
  t2 = { a: 3, b: 333, c: 5 };
let new_p = extend(t1, t2);

console.log('extend: ', new_p);

// merge
function merge(o, p) {
  for (i in p) {
    if (o.hasOwnProperty(i)) continue;
    o[i] = p[i]
  }
  return o;
}
console.log('merge:', merge(t1, t2))

// 删除同名属性
function restict(o, p) {
  Object.keys(o).forEach(function (i) {
    if (!(i in p)) delete o[i];
  })
  return o
}

console.log('restict:', restict(t2, t1));
// o中属性在p中存在，则删除o中属性
// 返回o
function subtract(o, p) {
  Object.keys(p).forEach(function (i) {
    console.log(i)
    delete o[i]
  })
  return o;
}

console.log('subtract', subtract(t1, t2));

function union(o, p) {
  return extend(extend({}, o), p);
}
console.log('union', union({
  a: 1, b: 2, c: 3
}, { e: 4 }));

function intersection(o, p) {
  return restict(extend({}, o), p);
}
console.log('intersection', intersection(
  { a: 1, b: 2, c: 3 }, {
    e: 2, d: 2, c: 2, f: 11
  }
))

function keys(o) {
  if (typeof o !== 'object') throw TypeError();
  let result = [];
  for (i in o) {
    if (o.hasOwnProperty(i)) result.push(i);
  }
  return o;
}
console.log('keys', keys({
  a: 1, b: 2, c: 3,
  get c() { return 1 },
  set c(val) { this.a = val }
}))

// getter, setter
var p = {
  x: 1.0,
  y: 1.0,
  get r() { return Math.sqrt(this.x * this.x + this.y * this.y) },
  set r(val) {
    var oval = this.r,
      ratio = val / oval;
    this.x *= ratio;
    this.y *= ratio;

  },
  get theta() { return Math.atan2(this.y, this.x) }
}

p.r = 2
console.log('p[getter, setter]', p.r, p.theta)

let q = inherit(p)
q.x = 1, q.y = 2
console.log(q.r, q.theta)

// get 用法
const random = {
  get octet() { return Math.floor(Math.random() * 256) },
  get uint16() { return Math.floor(Math.random() * 65536) },
  get int16() { return Math.floor(Math.random() * 65536) - 32768 }
}

console.log('random: ', random.octet, random.uint16, random.int16)

// # getOwnPropertyDescriptor获取对象某个特定的属性，返回描述符

// { value: 1, writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor({ x: 1 }, 'x'))
/*{
get: [Function: get octet],
  set: undefined,
    enumerable: true,
      configurable: true
}*/
console.log(Object.getOwnPropertyDescriptor(random, 'octet'))

console.log(Object.getOwnPropertyDescriptor({}, 'x'))
console.log(Object.getOwnPropertyDescriptor({}, 'constrcutor'))

console.log(Object.getPrototypeOf(random))

// defineProperty
var o = {};
Object.defineProperty(o, "x", {
  value: 100,
  writable: true,
  enumerable: false,
  configurable: true
})
// enumerable = false, {}
console.log(o)
// enumerable = true, { x: 100 }
Object.defineProperty(o, 'x', { enumerable: true })
console.log(o)

// configurable = false
Object.defineProperty(o, 'x', { configurable: false })
o.x = 200
console.log(o)
// writable = false
Object.defineProperty(o, 'x', { writable: false })
o.x = 100
console.log(o)
// configurable = false
// enumerable = false TypeError: Cannot redefine property: x
Object.defineProperty(o, 'x', { enumerable: false })