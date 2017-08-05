### 写一个 TodoList 的 reducer 之 toggling-a-todo
copy上一节的代码，我们继续写TogglingTodo.
在testAddTodo函数下面我们再定义一个testTogglingTodo的函数
```js
const testTogglingTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: false
    }
  ]
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: true
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter)
}
```
和testAddTodo函数很像，不同的是这里的stateBefore我们给了两个数据，id:0和id:1。在我们的todolist例子中，我们想要做的是点击某个代办事项，让它的completed从false变成true.另外在todos里面我们要加一个case
```js
case 'TOGGLE_TODO':
  return state.map(todo => {
    if(todo.id!==action.id){
      return todo
    }
    return {
      ...todo,
      completed:!todo.completed
    }
  }) 
```
接着执行testTogglingTodo()
npm start可以看到我们顺利完成了代码测试
### 下面我们也稍微梳理下这边的逻辑吧
和上一节相同的地方我就不在赘述，让我们来看看不一样的几个地方，上一节的我们类似于增加数据，这一节我们是修改数据，正所谓数据的增删改。
函数定义里面我们给了我们的数据源，就是我们说的state，就是一个todos代办事项列表数组
```js
const stateBefore = [
  {
    id: 0,
    text: 'Learn Redux',
    completed: false
  },
  {
    id: 1,
    text: 'Go Shopping',
    completed: false
  }
]
```
action定义了type类型和id，根据type,我们知道在reducer中我们走哪个case,根据id我们知道点击的是哪个待办事项。这边id我们写死了，但是不影响我们理解整个流程
```js
const action = {
  type: 'TOGGLE_TODO',
  id: 1
}
```
由于我们点击的是待办事项列表的具体某个事项，所以从testTogglingTodo函数传过来的state需要遍历每个项，如果外面传来的id和自身id不同，说明点击的不是自己，原样返回，如果相同就说明点击的是自己，需要将completed属性置为与之相反的状态
```js
case 'TOGGLE_TODO':
  return state.map(todo => {
    if(todo.id!==action.id){
      return todo
    }
    return {
      ...todo,
      completed:!todo.completed
    }
  })  
```