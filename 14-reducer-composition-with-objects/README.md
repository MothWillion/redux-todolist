### Reducer Composition With Objects  CombineReducer演化过程
这一节有用到redux的createStore函数：
```js
import { createStore } from 'redux'
```
本节代码只保留上一节的todo和todos,其他代码删除，再定义一个store:
```js
const todo = (state,action) => {...}
const todos = (state = [], action) => {...}

const store = createStore(todos)
```
通过createStore得到的store有一个API可以获得当前状态：
```js
console.log('Initial state:')
console.log(store.getState())  // []
console.log('--------------')
```
没错，在没有派发任何action时，返回一个空的数组。下面我们给它dispatching一个'ADD_TODO' action：
```js
console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})
console.log('Current state:')
console.log(store.getState())  // [{id: 0, text: "Learn Redux", completed: false}]
console.log('--------------')
```
是的，数组里有东西了，我们再给它派发一个'ADD_TODO' action，看看会发生什么:
```js
console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping'
})
console.log('Current state:')
console.log(store.getState())  // [{id: 0, text: "Learn Redux", completed: false},{id: 1, text: "Go Shopping", completed: false}]
console.log('--------------')
```
数组里现在有两条数据了，我们试着派发一个'TOGGLE_TODO' action:
```js
console.log('Dispatching TOGGLE_TODO.')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})
console.log('Current state:')
console.log(store.getState())  // [{id: 0, text: "Learn Redux", completed: true}{id: 1, text: "Go Shopping", completed: false}]
console.log('--------------')
```
"Learn Redux"这个待办项变成已完成了。我们知道todolist除了todos还有visibilityFilter，控制待办项显示隐藏。
```js
//...
const visibilityFilter = (state = 'SHOW_ALL',action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const store = createStore(visibilityFilter)

console.log('Dispatching SET_VISIBILITY_FILTER.')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log('Current state:')
console.log(store.getState())    // 'SHOW_COMPLETED'
console.log('--------------')
```
最后我们需要把这两个reducer整合到一起：
```js
// ...
const todos = (state = [], action) => {...}
const visibilityFilter = (state = 'SHOW_ALL',action) => {...}

const todoApp = (state={}, action) => {
  return {
    todos:todos(state.todos,action),
    visibilityFilter:visibilityFilter(state.visibilityFilter,action)
  }
}
```
看这个todoApp这个顶级reducer是不是和todos有点像，不过这个是更顶层的，初始化state为一个对象，返回的state有两个属性todos和visibilityFilter.下面我们来看看todoApp得到的state是什么吧：
```js
//...
const store = createStore(todoApp)

console.log('Initial state:')
console.log(store.getState())  // {[],visibilityFilter: "SHOW_ALL"}
console.log('--------------')

console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})
console.log('Current state:')
console.log(store.getState())  // {[{id: 0, text: "Learn Redux", completed: false}],visibilityFilter:"SHOW_ALL"}
console.log('--------------')

console.log('Dispatching ADD_TODO.')
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping'
})
console.log('Current state:')
console.log(store.getState())  // {[{id: 0, text: "Learn Redux", completed: false},{id: 1,text: "Go Shopping",completed:false}],visibilityFilter:"SHOW_ALL"}
console.log('--------------')

console.log('Dispatching TOGGLE_TODO.')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})
console.log('Current state:')
console.log(store.getState())  // {[{id: 0, text: "Learn Redux", completed: true},{id: 1,text: "Go Shopping",completed:false}],visibilityFilter:"SHOW_ALL"}
console.log('--------------')

console.log('Dispatching SET_VISIBILITY_FILTER.')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
console.log('Current state:')
console.log(store.getState())  // {[{id: 0, text: "Learn Redux", completed: true},{id: 1,text: "Go Shopping",completed:false}],visibilityFilter:"SHOW_COMPLETED"}
console.log('--------------')
```
至此，是不是思路清晰了。我们接下去看看Dan 老师怎么教我们的吧。[上一节](https://github.com/MothWillion/redux-todolist/tree/master/13-reducer-composition-with-arrays) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/15-reducer-composition-with-combinereducers)