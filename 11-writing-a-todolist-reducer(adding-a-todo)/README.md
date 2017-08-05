### 写一个 TodoList 的 reducer
copy 之前的初始化环境的文件到本次项目中，把 index.js 清空，这次我们新增了deep-freeze和expect两个包，运行下面代码安装
```js
npm i deep-freeze expect --save-dev
```
在index.js中开始我们的 TodoList 之旅
首先我们需要在 index.js 文件中引入我们的依赖
```js
import deepFreeze from 'deep-freeze'
import expect from 'expect'
```
接着我们来定义我们的 reducer ,我们知道reducer是纯函数，const reducer = (stateBefore, action) => stateAfter.这里 Dan Abramov 让我们先留空，为了让我们理解这个东西到底是怎么回事。
```js
const todos = (state = [], action) => {
  
}
```
然后我们定义一个 testAddTodo 测试函数，在最后执行了这个函数并在控制台打印测试是否通过。这个函数很简单，就是定义了两个state和一个action,stateBefore和action作为参数传到todos中，然后用expect来测试是否会返回一个我们期待的stateAfter，当然，这肯定会报错，因为目前todos并没有返回值。这里我们先不管他是否能执行，我们继续写。
```js
const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]
  // 使用deepFreeze校验数据不可变
  deepFreeze(stateBefore)
  deepFreeze(action)
  // npm 官网给的例子
  // deepFreeze(Buffer);
  // Buffer.x = 5;
  // console.log(Buffer.x === undefined);   // true
  // Buffer.prototype.z = 3;
  // console.log(Buffer.prototype.z === undefined);  // true

  // expect 断言
  // expect 可以让你写出更好的断言。
  // 当您使用 expect 时，您将类似于如何声明它们编写断言，例如“我期望这个值等于3”或“我期望这个数组包含3”。当你写下这样的断言，你不需要记住实际订单和预期函数的参数 assert.equal，帮助你写出更好的测试。你可以用 chai 或 sinon.js 替代 expect
  expect(
    todos(stateBefore,action)
  ).toEqual(stateAfter)
}

testAddTodo()
console.log('All tests passed.')
```
写完这些后，我们就可以先运行一下npm start 看看效果，发现报错了：
```js
Uncaught Error: Expected undefined to equal [ { id: 0, text: 'Learn Redux', completed: false } ]
```
因为我们在 todos 这个reducer中没有返回state，接下来我们把我们要返回的state补上
```js
const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}
``` 
再次运行npm start，我们就能看到测试通过了，在控制台输出了 All tests passed.
### 下面我们来梳理一下这个程序是怎么跑通的，他们都干了什么
```js
testAddTodo()
```
这个函数先执行，我们进去看看
```js
const testAddTodo = () => {
  const stateBefore = []
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    todos(stateBefore,action)
  ).toEqual(stateAfter)
}
```
我们通过deepFreeze函数将我们即将传的参数冻结，让其不可变，以期达到放心于state的单一不可变性
```js
deepFreeze(stateBefore)
  deepFreeze(action)
```
接着进入我们的expect断言，执行todos函数
```js
expect(
    todos(stateBefore,action)
  ).toEqual(stateAfter)
```
todos函数根据传进来的参数，返回了它应该返回的值
```js
// todos(stateBefore,action) 
const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}
```
因为我们传进去的action.type为'ADD_TODO'，stateBefore为一个空数组
```js
const stateBefore = []
const action = {
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
}
```
switch走这个case时返回了一个新的state
```js
case 'ADD_TODO':
  return [
    // 一个新的 state
  ]
```
这个state是由stateBefore和action发送过来的数据来更新这个state
```js
return [
    ...state,   // stateBefore
    {
      id: action.id,   // 0 
      text: action.text,    // 'Learn Redux'
      completed: false    // false
    }
  ]
```
这里用es6的...state就能代表stateBefore.这样呢，我们返回的新state就应该是
```js
[
  {
    id: 0,
    text: 'Learn Redux',
    completed: false
  }
]
```
我们看到这里的新state和我们事先定义好的stateAfter是不是一模一样呢？是的，就是一样的，于是expect().toEqual()能通过。