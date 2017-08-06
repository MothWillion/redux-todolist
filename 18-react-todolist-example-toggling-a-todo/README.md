### React TodoList 例子之切换todo完成状态
```js
// ...
<ul>
  {this.props.todos.map( todo => 
    <li 
      key={todo.id} 
      onClick={()=>{
        store.dispatch({
          type: 'TOGGLE_TODO',
          id: todo.id
        })
      }} 
      style={{
        textDecoration:todo.completed?'line-through':'none'
      }}
    >
      {todo.text}
    </li>
  )}
</ul>
// ...
```
在li里面加上onClick事件分发action,再加上一个style控制单个todo的完成和未完成的样式，是不是很简单呢？让我们继续吧