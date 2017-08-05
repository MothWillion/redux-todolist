## 初始化开发环境
本项目没有采用webpack来搭建项目环境，考虑到项目比较小，之前看react官网的例子用的是 react-scripts 来快速搭建环境，所以今天也尝试一下，不挖坑不舒服司机 ^_^.
### 初始化项目 
打开项目根目录，运行以下代码初始化项目，一路按回车
```js
npm init -y
```
在根目录下自动生成一个package.json文件
安装依赖包
```js
// 开发依赖 react-scripts
npm i react-scripts --save-dev
// 基本依赖 react react-dom redux react-redux prop-types
npm i react react-dom redux react-redux prop-types --save
```
接着package.json 文件会多出下面依赖,说明依赖包安装成功
```json
  "devDependencies": {
    "react-scripts": "^1.0.10"
  },
  "dependencies": {
    "prop-types": "^15.5.10",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-redux": "^5.0.5",
    "redux": "^3.7.2"
  }
```
好了，现在开始建我们的初始化文件吧。
### 项目目录结构
```js
|——public      //在本例中只是放置模版文件 
|    |  index.html     // 模版文件
|——src        //放置js源文件
|    |  index.js       // 项目入口文件
|  package.json   // 依赖配置文件
|  package-lock.json   // npm5.0以后的版本为了锁定依赖包做的一个限制，不用管。
|  README.md   // readme文件，没卵用
```
react-scripts的具体用法参考[这里](https://www.npmjs.com/package/react-scripts)在这里就不赘述了。另外我们需要在package.json的"scripts":{}中加入下述代码
```js
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "test": "react-scripts test"
  },
```
在public文件夹下建一个index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Redux TodoList</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
在src文件夹下建一个index.js
```js
import React from 'react'
import {render} from 'react-dom'

const Init = ()=>{
  return(
    <h1>Hello Redux!</h1>
  )
}

render(<Init/>,document.getElementById('app'))
```
现在我们只要运行一下npm start 就可以坐等弹出个Hello Redux!啦
```js
npm start
```
