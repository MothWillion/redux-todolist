### 用React-Redux的 connect API生成容器组件 AddTodo
上一节我们只给TodoList组件使用connect连接生成容器组件，当容器组件很多的时候，我们命名就应该改改了：
```js
const mapStateToTodoListProps = (state) => {
// ...
}

const mapDispatchToTodoListProps = (dispatch) => {
// ...
}

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)
```
接着我们开始生成我们的AddTodo容器：
```js
let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input type="text" ref={
        node => {
          input = node
        }
      }/>
      <button onClick={() => {
        dispatch({
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
AddTodo = connect()(AddTodo)
```
这个容器很特殊，connect自己生成容器组件，这边涉及到了[let和const的区别](http://blog.csdn.net/tanhao_282700/article/details/68928579),在这里就不赘述。由于AddTodo组件没有属性，所以没有要连接的。[上一节](https://github.com/MothWillion/redux-todolist/tree/master/27-generating-containers-with-connect-from-react-redux-visibletodolist) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/29-generating-containers-with-connect-from-react-redux-filterlink)