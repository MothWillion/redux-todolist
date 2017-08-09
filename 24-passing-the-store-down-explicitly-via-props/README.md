### 通过props明确地向下传递store
之前我们用的store：
```js
const store = createStore(todoApp)
```
这样定义在全局所以大家都可以调到这个store,现在我们不在全局定义了，我们把它当作组件属性逐层往下传递，第一层：
```js
ReactDOM.render(
  <TodoApp store={createStore(todoApp)}/>,
  document.getElementById('app')
)
```
第二层：
```js
const TodoApp = ({store}) => (
  <div>
    <AddTodo store={store}/>
    <VisibleTodoList store={store}/>
    <Footer store={store}/>
  </div>
)
```
第三层：
```js
// AddTodo
const AddTodo = ({store}) => {
 // ...
}

// VisibleTodoList
class VisibleTodoList extends React.Component{
  componentDidMount(){
    const { store } = this.props
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const props = this.props 
    const { store } = props
    const state = store.getState()
    // ...
  }
}

// Footer
const Footer = ({store}) => (
  <p>
    Show:
    {' '}
    <FilterLink 
      filter="SHOW_ALL"
      store={store}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_ACTIVE"
      store={store}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_COMPLETED"
      store={store}
    >
      Completed
    </FilterLink>
  </p>
)
```
第四层：
```js
class FilterLink extends React.Component{
  componentDidMount(){
    const { store } = this.props
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const props = this.props
    const { store } = props
    const state = store.getState()
    // ...
  }
}
```
为什么要这样做呢？接下来的几节就知道了！[上一节](https://github.com/MothWillion/redux-todolist/tree/master/23-extracting-container-components-visibletodolist-addtodo) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/25-passing-the-store-down-implicitly-via-context)