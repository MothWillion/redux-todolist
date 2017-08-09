### 最终的 TodoList
这是我自己整理的，虽然对于逻辑来说已经写完了，但是我们的index文件太大了，我们把它拆分成独立的文件，使得我们的项目解构清晰饱满。我们把容器组件都放在container文件夹内，其他UI组件放在components文件夹下，另外我们单独给actions一个文件夹，给reducers一个文件夹，下面放着各个单独的reducer。最终的目录结构如下：
```js
|—— public      
|     |  index.html  //模版文件
|—— src
|     |——actions  // 所有action
|           |  index.js
|     |——components  // UI组件
|           |  TodoApp.js  
|           |  Footer.js 
|           |  Link.js  
|           |  Todo.js  
|           |  TodoList.js  
|     |——containers  // 容器组件
|           |  AddTodo.js  
|           |  FilterLink.js  
|           |  VisibleTodoList.js  
|     |——reducers  // 所有reducer
|           |  index.js  
|           |  todos.js 
|           |  visibilityFilter.js
|           |  todo.js
|           |  getVisibleTodos.js 
|     |  index.js  // 项目入口文件 
|   .gitignore  // git忽略规则文件
|   package-lock.json // npm5.0以后npm install会自动带上。。。（不用理会）
|   package.json  // 项目包依赖
|   README.md  // 文档说明文件
```
将index拆分成单个文件的时候，对于组件，每个文件都必须引入React,并且要export default Xx组件；对于actions,每个函数都要export xx函数，在其他文件中引入某个函数时要加上{xx}；对于reducers,需要用到什么库，就要引入什么库，另外注意export default和export的区别。结束啦，Dan 老师还有一个[系列课程](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)，有想提高的同学可以点击观看哦，讲的真的不错，如果英语好的话！我写这个分享一共花了4天时间，主要就是英语太烂，老师讲的10句有8句听不懂，只能反复听，理解代码意思。这个分享仅是个人以一个初学者的身份学习的过程，其中肯定有很多理解不对的地方，欢迎指正！

