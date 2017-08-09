### 提取 AddTodo Footer FilterLink组件
提取 AddTodo 组件：
```js
const AddTodo = ({
  onAddClick
}) => {
  let input
  return (
    <div>
      <input type="text" ref={
        node => {
          input = node
        }
      }/>
      <button onClick={() => {
        onAddClick(input.value)
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
```
经过前两个组件的提取，现在看这个应该很简单了，我们接着提取Footer组件：
```js
const Footer = ({
  visibilityFilter
}) => (
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
)
```
这个组件最简单，我们接着看FilterLink组件：
```js
const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if(filter===currentFilter){
    return <span>{children}</span>
  }
  return(
    <a href="" 
      onClick={e=>{
        e.preventDefault()
        onClick(filter)
      }}
    >
      {children}
    </a>
  )
}
```
之前我们这个组件已经写过了，但是数据要从父组件来，这边还要把dispatch放到外层去，于是给FilterLink组件加个onClick属性，接着回到Footer组件，我们需要把FilterLink的属性加上：
```js
const Footer = ({
  visibilityFilter,
  onFilterClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink 
      filter="SHOW_ALL"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_ACTIVE"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink 
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
)
```
是的，由于FilterLink不是最顶层组件，所以要以Footer的属性传进来，给Footer组件加一个onFilterClick属性，这样我们剩下的三个组件也提取完了，TodoApp最终长这样：
```js
let nextTodoId = 0
const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo
      onAddClick={text=>{
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }}
    />
    <TodoList 
      todos={
        getVisibleTodos(
          todos,
          visibilityFilter
        )
      }
      onTodoClick={id=>{
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }}
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter=>{
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    />
  </div>
)
```
最后，我们通过属性onAddClick和onFilterClick将action传进去，这样看起来是不是更好看了呢，结构清晰，内部逻辑在这边完全不用关心，redux大法强无敌！[上一节](https://github.com/MothWillion/redux-todolist/tree/master/20-extracting-presentational-components-todo-todolist) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/22-extracting-container-components-filterlink)