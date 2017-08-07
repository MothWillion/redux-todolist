### React TodoList 例子之过滤列表显示
上一节我们已经完成了待办项的完成与否切换，现在我们需要把完成的，未完成的或者全部待办项展示出来，我们先构建过滤元素出来：
```js
// ...
<p>
  Show:
  {' '}
  <FilterLink>
    All
  </FilterLink>
  {' '}
  <FilterLink>
    Active
  </FilterLink>
  {' '}
  <FilterLink>
    Completed
  </FilterLink>
</p>
// ...
```
接着我们来写FilterLink组件：
```js
const FilterLink = ({
  filter,
  children
}) => {
  return(
    <a href="#" 
      onClick={e=>{
        e.preventDefault()
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    >
      {children}
    </a>
  )
}
```
这里我们传了两个属性进来，一个是filter,用于过滤todos列表，一个是children,用于获取组件子元素，这边filter我们还没给组件加上，我们去加一下：
```js
<p>
  Show:
  {' '}
  <FilterLink filter="SHOW_ALL">
    All
  </FilterLink>
  {' '}
  <FilterLink filter="SHOW_ACTIVE">
    Active
  </FilterLink>
  {' '}
  <FilterLink filter="SHOW_COMPLETED">
    Completed
  </FilterLink>
</p>
```
回到FilterLink组件，我们点击a标签的时候dispatch一个action:
```js
const visibilityFilter = (state = 'SHOW_ALL',action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
```
这个visibilityFilter reducer返回的是一个filter字符串，默认返回'SHOW_ALL'，在dispatch中我们传进去的filter是FilterLink组件的一个属性filter，所以我们点击哪一个，就会返回哪一个的filter属性。这样我们打开浏览器就能看到我们的过滤器渲染出来了，但是我们并没有过滤的功能，下面我们接着写过滤功能的reducer：
```js
const getVisibleTodos = (todos,filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}
```
默认走'SHOW_ALL'这个case,返回所有的todo,已完成的我们返回filter()过滤出已完成的todo,还活跃着的未完成的我们返回未完成的todo。这里大家可能和我一样对filter()有疑问，[学习filter函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)，这一节内容多，就不在这里解释filter的用法了。接着往下看：
```js
class TodoApp extends React.Component{
  render(){
    const {todos,visibilityFilter} = this.props
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter
    ) 
// ...
    <ul>
      {visibleTodos.map( todo => {...})}
    </ul>
// ...
  }
}
```
这样，我们就获取到了visibleTodos了,然后把之前的this.props.todos换成这个，因为我们需要展示经过滤后的todos。我们发现这里有两个父组件传过来的属性，我们知道我们上一节父组件只有一个属性todos,所以我们要过去把visibilityFilter属性加上：
```js
const render = () => {
  ReactDOM.render(
    <TodoApp 
      todos={store.getState().todos}
      visibilityFilter={store.getState().visibilityFilter}
    />,
    document.getElementById('app')
  )
}
```
哇靠！还好只有两个属性，要是有100个属性，我会当场晕死，有没有简单一点的写法呢？答案是肯定的：
```js
const render = () => {
  ReactDOM.render(
    <TodoApp 
      {...store.getState()}
    />,
    document.getElementById('app')
  )
}
```
其实这个用法在之前的章节中已经了解了，哈哈，算是赘述了。。。这样我们回到浏览器，就能看到我们的过滤器有过滤效果了。但是还是不完美，我们发现没有区别当前是哪个过滤器，怎么区别开来呢？继续看：
```js
const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if(filter===currentFilter){
    return <span>{children}</span>
  }
  return(
    <a href="#">
      ...
    </a>
  )
}
```
我们再加一个属性currentFilter来表示当前选择的过滤器，如果点击的就是当前的filter,我们就返回一个span而非一个a.这样既区别开了样式也避免了重复点击带来的问题，因为已经不是a了，没有点击事件绑在上面了。大家可能会问，currentFilter属性是什么呢？就是父组件传过来的visibilityFilter属性。不然我们之前辛辛苦苦算这个visibilityFilter干嘛呢？最后，我们把currentFilter属性加上：
```js
<p>
  Show:
  {' '}
  <FilterLink 
    filter="SHOW_ALL"
    currentFilter={visibilityFilter}
  >
    All
  </FilterLink>
  {' '}
  <FilterLink 
    filter="SHOW_ACTIVE"
    currentFilter={visibilityFilter}
  >
    Active
  </FilterLink>
  {' '}
  <FilterLink 
    filter="SHOW_COMPLETED"
    currentFilter={visibilityFilter}
  >
    Completed
  </FilterLink>
</p>
```
至此，todolist例子已经做完了，但是Dan老师还啰嗦了11节！继续探索吧。。。