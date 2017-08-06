### combineReducers 源码解析
首先我们把从redux库中引用的combineReducers注释掉，我们自己写一个：
```js
// import { combineReducers } from 'redux' 
// ...
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        )
        return nextState
      },
      {}
    )
  }
}
// ...
```
乍一看，靠！这是什么鬼？没错，这就是combineReducers的源码，一脸看不懂(┬＿┬)。硬着头皮看，一层一层拨开你的面纱：
```js
const combineReducers = (reducers) => {
  return (state = {}, action) => {...}
}
```
最外层我们很熟悉的，就是定义一个combineReducers函数，传一个reducers参数进去，返回了一个貌似reducer的一个函数，接着往里看：
```js
(state = {}, action) => {
  return Object.keys(reducers).reduce(...)
}
```
啊！这里真的看不懂了，这个reducer函数返回了一个陌生的东西，小弟弟我从没见过啊，只能问问度娘了，[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
```js
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // ['2', '7', '100']

// getFoo is property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  } 
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```
看完这个例子我们知道了Object.keys()返回的是一个数组，数组元素为给定数组或对象的下标或属性，好了，看我们的例子，我们传进去的是一个reducers,这是一个对象，从combineReducers的用法中我们清楚知道这是一个包含了多个reducer的对象，并且对象的属性和属性值都为单个reducer的函数名，所以我们简化了写法，上一节我们刚写过。这样的话，我们就可以知道在本例中，Object.keys(reducers)会返回下面数组：
```js
// reducers : {todos,visibilityFilter}
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
// return [todos,visibilityFilter]
[todos,visibilityFilter].reduce(...)
```
啊！又是一个陌生的API,继续度娘：[Array.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce_clone)语法如下：
```js
arr.reduce([callback, initialValue])
```
所以我们知道了我们的例子里是什么东西了：
```js
[todos,visibilityFilter].reduce(
// callback是执行数组中每个值的函数，包含四个参数:
// previousValue: 上一次调用回调函数返回的值，或者是提供的初始值（initialValue） // {}
// currentValue: 数组中当前被处理的元素  // nextState
// currentIndex: 当前被处理元素在数组中的索引, 即currentValue的索引.如果有initialValue初始值, 从0开始.如果没有从1开始.  // key
// array: 调用 reduce 的数组  // [todos,visibilityFilter]
  (nextState, key) => {
    nextState[key] = reducers[key](
      state[key],
      action
    )
    return nextState
  },
// initialValue: 可选参数, 作为第一次调用 callback 的第一个参数。
  {}
)
```
回调函数第一次执行时，previousValue 和 currentValue可能是两个不同值其中的一个，如果reduce有initialValue参数，那么 previousValue 等于 initialValue ，并且currentValue 等于数组中的第一个值；如果reduce没有 initialValue 参数，那么previousValue 等于数组中的第一个值，currentValue等于数组中的第二个值。我们看个简单的例子体验一下吧，这个还是有点抽象：
```js
[0, 1, 2, 3, 4].reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
});
```
上述代码是怎么执的呢？首先我们没给第二个参数initialValue,所以我们的currentIndex从1开始，currentValue为数组的第二个值。看流程：
```js
//                  previousValue    currentValue   currentIndex      array      return value
// first call:           0                1              1         [0,1,2,3,4]        1
// second call:          1                2              2         [0,1,2,3,4]        3
// third call:           3                3              3         [0,1,2,3,4]        6
// fourth call:          6                4              4         [0,1,2,3,4]        10
```
这样我们就明白了Array.reduce()是什么意思了，我们回到自己的例子：
```js
[todos,visibilityFilter].reduce(
  //callback:纯函数 （s,a）=>{... return s} 
  (nextState, key) => {
    nextState[key] = reducers[key](   // 这里的reducers[key]===reducers.key 就是具体某个reducer.
      state[key],   // 换个写法就很好理解了：state.key 。key上面我们已经知道了是Object.keys（reducers）返回的属性,即todos reducer返回的state或者//visibilityFilter reducer返回的state.   ！！！改变了被combine的reducer的state时就会更新顶层的state
      action
  )
  return nextState
  },{})
```
下面我们对我们的例子也做个执行流程看看：
```js
//                  previousValue        currentValue        currentIndex              array               return value
// first call:           {}              todos=>state             0         [todos,visibilityFilter]      {todos=>state}
// second call:    {todos=>state}   visibilityFilter=>state       1         [todos,visibilityFilter]   {todos=>state,visibilityFilter=>state}
```
啊！不知道分析的对不对，好复杂的说。继续跟着 Dan 探索吧。