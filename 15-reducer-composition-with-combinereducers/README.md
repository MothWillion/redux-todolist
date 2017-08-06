### Reducer Composition With CombineReducers  CombineReducer演化过程2
本节就要请我们的redux明星combineReducers出场了！
```js
import { combineReducers } from 'redux' 
```
这一节代码基本不变，就加了如下内容，很清晰的体现了combineReducers的作用：
```js
// const todoApp = (state={}, action) => {
//   return {
//     todos:todos(state.todos,action),
//     visibilityFilter:visibilityFilter(state.visibilityFilter,action)
//   }
// }         
//            ↓↓↓
// const todoApp = combineReducers({
//   todos:todos,
//   visibilityFilter:visibilityFilter
// })
//            ↓↓↓
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
```
这里我们就不深究combineReducers是怎么做到连接reducer的，想了解的朋友可以参考[combineReducers(reducers)](http://redux.js.org/docs/api/combineReducers.html)。