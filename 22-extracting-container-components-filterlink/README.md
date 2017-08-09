### 提取容器组件 FilterLink：
上一节我们将各个组件提取出来，单纯从结构上逐层往上分析整合，将数据放在最顶层去处理，实际上我们需要根据每个组件的实际作用，分离出处理数据的组件和渲染UI的组件，处理数据的组件我们通常称之为容器组件，也有人叫做智能组件，为什么智能？因为聪明的人总想着把握重要信息，UI组件也被人称为木偶组件，被人牵着鼻子走，我们先看看Footer组件的结构：
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
我们仔细看这个Footer组件的代码，不难发现一个问题，就是数据visibilityFilter和onFilterClick在Footer组件中逛了一圈，没做任何的处理，Footer组件表示很生气，好东西只给看不给吃还不如别给我看！哈哈哈，于是乎Footer组件将这两个属性拒之门外，不属于我的东西我不要！这样Footer组件看起来就单纯了很多：
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
实际上处理visibilityFilter和onFilterClick是FilterLink的工作，我们看看之前的FilterLink是怎样的：
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
currentFilter属性已经被干掉了，我们认真想想，其实这个FilterLink组件还可以提取一个组件Link,这个组件只负责显示UI:
```js
const Link = ({
  active,  
  children,
  onClick
}) => {
  if(active){
    return <span>{children}</span>
  }
  return(
    <a href="" 
      onClick={e=>{
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
```
Link的属性需要通过容器组件FilterLink组件来定义：
```js
class FilterLink extends React.Component{
  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  render(){
    const props = this.props
    const state = store.getState()
    return (
      <Link
        active={props.filter===state.visibilityFilter}
        onClick={()=>{
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }}
      >
        {props.children}
      </Link>
    )
  }
}
```
这里有疑问的地方应该是两个生命周期函数，我们先不管它到底干嘛的，大概知道是订阅强制更新，让视图得以渲染？[上一节](https://github.com/MothWillion/redux-todolist/tree/master/21-extracting-presentational-components-addtodo-footer-filterlink) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/23-extracting-container-components-visibletodolist-addtodo)