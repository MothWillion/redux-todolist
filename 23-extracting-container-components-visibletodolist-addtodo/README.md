### 提取容器组件 VisibleTodoList 和 AddTodo 
```js
class VisibleTodoList extends React.Component{
  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    // const props = this.props 没用到，先写着
    const state = store.getState()
    return(
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id=>{
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }}
      />
    )
  }
}
```
数据权交给“独立部门”来解决，更易于维护吧，也让根组件看起来简单清晰。接着提取Addtodo组件：
```js
const AddTodo = () => {
  let input
  return (
    <div>
      <input type="text" ref={
        node => {
          input = node
        }
      }/>
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
```
这个组件比较简单，没有什么可以提取的，数据呢都是自己提供自己处理，不需要外来的属性，所以也没有之前提的组件的生命周期函数。提取完这两个组件后，再来看看TodoApp组件变成啥样了：
```js
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)
```
yes！很清爽，实际上，由于我们在每个容器组件都加上订阅后，顶层的订阅就可以删了：
```js
// const render = () => {
  ReactDOM.render(
    <TodoApp 
//      {...store.getState()}
    />,
    document.getElementById('app')
  )
//}
// store.subscribe(render)
// render()
```
[上一节](https://github.com/MothWillion/redux-todolist/tree/master/22-extracting-container-components-filterlink) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/24-passing-the-store-down-explicitly-via-props)