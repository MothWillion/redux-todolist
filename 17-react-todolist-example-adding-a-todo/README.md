### React TodoList 例子之添加 todo
首先引入React和Redux的依赖
```js
import { createStore, combineReducers } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'
```
在之前的章节我们都是在对数据进行操作，现在我们开始组织我们的代码让数据渲染到浏览器中，定义一个渲染函数render:
```js
const render = () => {
  
}
```
我们要用subscribe函数去订阅这个render以达到实时监控更新渲染的目的：
```js
store.subscribe(render)
```
另外，我们必须先有个初始的render执行,产生的初始状态，这样才有后面的状态更新嘛：
```js
render()
```
下面我们来完善我们的render函数：
```js
const render = () => {
  ReactDOM.render(
    <TodoApp />,
    document.getElementById('app')
  )
}
```
学过React的同学这里再熟悉不过了，下面我们需要编写TodoApp这个组件：
```js
let nextTodoId = 0
class TodoApp extends React.Component{
  render(){
    return(
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          })
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map( todo => 
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```
在TodoApp中，我们返回一个div，div分两部分：button和ul,点击button我们分发一个action给store,然后在ul里我们取这个组件的todos属性遍历来把todo的text取出来。我们发现，我们的todos属性还没有定义，下面我们去TodoApp组件上写上todos属性：
```js
const render = () => {
  ReactDOM.render(
    <TodoApp 
      todos={store.getState().todos}
    />,
    document.getElementById('app')
  )
}
```
这样我们就可以在页面上看到一个Add Todo按钮，我们点击它就会在下面显示'Test'字样。但是这并不是我们想要的样子，我们需要一个输入框，我们输入什么就加什么，而不是固定的'Test':
```js
let nextTodoId = 0
class TodoApp extends React.Component{
  render(){
    return(
      <div>
      {/*这里的this.input就是input的DOM节点，通过this.input.value就能取到input的值*/}
        <input type="text" ref={
          node => {
            this.input = node
          }
        }/>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,  // input的值作为这个todo的text传到store去更新
            id: nextTodoId++
          })
          this.input.value = ''
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map( todo => 
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```
重新回到浏览器，我们看到我们的输入框已经出来了，并且我们输入一些文字进去点击按钮就可以在下面显示了！[上一节](https://github.com/MothWillion/redux-todolist/tree/master/16-implementing-combinereducers-from-scratch) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/18-react-todolist-example-toggling-a-todo)