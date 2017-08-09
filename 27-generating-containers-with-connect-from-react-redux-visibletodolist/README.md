### 用React-Redux的 connect API生成容器组件 VisibleTodoList
```js
// ...
//  <TodoList
//    todos={
//      getVisibleTodos(
//        state.todos,
//        state.visibilityFilter
//      )
//    }
//    onTodoClick={id=>{
//      store.dispatch({
//        type: 'TOGGLE_TODO',
//        id
//      })
//    }}
//  />
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```
TodoList上的两个属性todos和onTodoClick被提出来放到两个方法中去返回，然后容器组件VisibleTodoList通过connect方法把刚刚得到的两个结果当参数传进去，后面括号就是承载我们两个属性的组件。这里你可能想要去看看[connect的源码](https://github.com/reactjs/react-redux/blob/master/src/connect/connect.js)、[mapStateToProps源码](https://github.com/reactjs/react-redux/blob/master/src/connect/mapStateToProps.js)、[mapDispatchToProps源码](https://github.com/reactjs/react-redux/blob/master/src/connect/mapDispatchToProps.js)
