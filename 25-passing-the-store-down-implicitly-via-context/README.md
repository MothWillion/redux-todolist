### 通过context隐式向下传递store
上一节我们通过props传递store，这一节我们通过context来传递store，看看有何区别。首先我们定义一个Provider组件，这个组件干嘛用的呢？我们慢慢分析：
```js
// 定义
class Provider extends React.Component{
  getChildContext(){
    return {
      store:this.props.store
    }
  }
  render(){
    return this.props.children
  }
}

// 使用
ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
```
让我们来分析下这个Provider都干了什么？首先他有一个render函数，返回他的子节点，所以在结构上，没改变任何地方。我们看到还有一个函数getChildContext，这个函数作用是给孩子组件返回一个context对象，这个对象有个store属性设置为这个组件的属性，初始时，我们给了Provider一个store属性，于是Provider的孩子组件TodoApp的context就有了store属性，并且他的子孙后代都可以通过this.context获取到store，这样跨组件的数据传递不利于数据跟踪，不利于维护，所以官方不建议[使用context](https://facebook.github.io/react/docs/context.html)。最后我们别忘了给Provider子组件定义数据类型：
```js
Provider.childContextTypes = {
  store: React.PropTypes.object
}
```
接着我们看看VisibleTodoList组件，把所有的store都由this.context获取：
```js
class VisibleTodoList extends React.Component{
  componentDidMount(){
    const { store } = this.context
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const props = this.props 
    const { store } = this.context
    const state = store.getState()
    // ...
  }
}
VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```
我们再来看Footer组件：
```js
const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink 
      filter="SHOW_ALL"
    >
      All
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_ACTIVE"
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_COMPLETED"
    >
      Completed
    </FilterLink>
  </p>
)
```
我们把store都删了，因为我们没有store属性了，我们是通过context传递数据的。这样的Footer我喜欢~继续看看AddTodo:
```js
const AddTodo = (props,{store}) => {
  let input
  // const {store} = this.context
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
AddTodo.contextTypes = {
  store: React.PropTypes.object
}
```
这里我们的store是通过参数传进来的，我们知道，组件的第一个参数是组件的属性，第二个参数就是组件的context.所以这里{store}当参数传进来就相当于const {store} = this.context。最后我们看看FilterLink：
```js
class FilterLink extends React.Component{
  componentDidMount(){
    const { store } = this.context
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const props = this.props
    const { store } = this.context
    const state = store.getState()
    // ...
  }
}
FilterLink.contextTypes = {
  store: React.PropTypes.object
}
```
至此，通过context隐式传递store就完成了。[上一节](https://github.com/MothWillion/redux-todolist/tree/master/24-passing-the-store-down-explicitly-via-props) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/26-passing-the-store-down-with-provider-from-react-redux)
