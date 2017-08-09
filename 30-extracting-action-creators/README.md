### 提取 action 创建函数
```js
let nextTodoId = 0

const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
```
用到action创建函数的地方改成下面的样子：
```js
// AddTodo组件
dispatch(addTodo(input.value))

// mapDispatchToLinkProps
dispatch(setVisibilityFilter(ownProps.filter))

// mapDispatchToTodoListProps
dispatch(toggleTodo(id))
```
这样整个TodoList的Demo就算是大功告成了，感谢 Dan ！ [上一节](https://github.com/MothWillion/redux-todolist/tree/master/29-generating-containers-with-connect-from-react-redux-filterlink) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/finally-todolist)