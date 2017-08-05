### Reducer Composition With Arrays reducer组成的数组
接着上一节，我们做了如下改动：
```js
// index.js
// ...
const todo = (state,action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id:action.id,
        text:action.text,
        completed:false
      }
    case 'TOGGLE_TODO':
      if(state.id!==action.id){
        return state
      }
      return {
        ...state,
        completed:!state.completed
      } 
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined,action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t,action))  
    default:
      return state
  }
}
// ...
```
替换之前的todos。这里将每一项待办项抽取出来用todo这个reducer来处理状态。在todo中，'ADD_TODO'返回的就不是数组了，而是一个对象
```js
// todo
// ...
case 'ADD_TODO':
  return {
    id:action.id,
    text:action.text,
    completed:false
  }
case 'TOGGLE_TODO':
  if(state.id!==action.id){
    return state
  }
  return {
    ...state,
    completed:!state.completed
  } 
// ...
```
这样我们的todos就是由todo组合成的
```js
// todos
// ...
case 'ADD_TODO':
  return [
    ...state,
    todo(undefined,action)   // 添加待办项，我们的初始状态stateBefore就是没有东西，stateAfter就是todo reducer返回的state对象
  ]
case 'TOGGLE_TODO':
  return state.map(t => todo(t,action))  //根据这个 t=>todo(t,action)返回的 t 就是每个待办项的状态。
// ...
```
改完这些运行 npm start 控制台正常返回 All tests passed.说明我们提取 todo reducer 成功了。