### 提取 Todo TodoList 组件
上一节我们已经完成了todolist的功能，但是我们发现我们整个TodoApp组件很大，里面揉了太多功能不易于维护，我们需要将每个单一的组件都提取出来，下面我们试着把单个待办项todo提取出来，删掉之前的<li></li>及里面的内容，创建一个Todo组件替代之前的li：
```js
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li 
    {/*key={todo.id}   // 因为已经提取出来了，key应该加在<Todo/>上，而非这里*/}
    onClick={onClick} 
    {/*onClick={()=>{   // onClick去分发action,这个分发action的动作应该作为属性传进来的，
      store.dispatch({  // 外面传什么action里面做什么操作，这样提出来的组件才纯净，于是我们
        type: 'TOGGLE_TODO',   // 需要给Todo组件加上onClick属性
        id: todo.id
      })
    }}*/}
    style={{
      textDecoration:completed?'line-through':'none' {/*completed作为属性传进来的，不需要todo.completed了*/}
    }}
  >
    {text}  {/*text作为属性传进来的，不需要todo.text了*/}
  </li>
)
```
下面我们再创建一个TodoList组件：
```js
/*<ul>
  {visibleTodos.map( todo => 
    <li >
      ...
    </li>
  )}
</ul>*/
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map( todo => 
      <Todo 
        key={todo.id}
        {...todo} 
        onClick={()=>{
          onTodoClick(todo.id)
        }} 
      />
    )}
  </ul>
) 
```
没提取之前，我们是对visibleTodos遍历，但是作为一个单纯的组件，我们只需要传递这样一个属性即可，我们就用todos来表示，另外<li></li>应该被<Todo/>组件替代，并且我们在遍历todos列表时需要给每个Todo加上唯一的key,用{...todo}表示Todo组件的所有属性（text={todo.text} completed={todo.completed}），是的，还要加一个onClick属性，作为组件，我们只需要知道点击的是哪个Todo就行了，所以我们这里还必须给个onTodoClick的属性，便于顶层组件传数据进来。写好了TodoList组件，就可以将原来的ul替换掉了：
```js
// <ul></ul>
<TodoList 
  todos={visibleTodos}
  onTodoClick={id=>
    store.dispatch({
      type: 'TOGGLE_TODO',
      id
    })
  }
/>
```
上面我们说了我们需要一todos属性和一个onTodoClick属性，这里的todos应该传入过滤后的列表，我们的TodoList组件就是干这事的！接着我们onTodoClick就可以执行分发action了，因为这已经是顶层组件了。下一节我们把剩下的组件都提取出来。