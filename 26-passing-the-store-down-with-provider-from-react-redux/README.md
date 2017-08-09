### 用React-Redux的Provider组件传递store
引入Provider:
```js
import { Provider } from 'react-redux'
```
将上节自定义的Provider组件删除：
```js
//  class Provider extends React.Component{
//    getChildContext(){
//      return {
//        store:this.props.store
//      }
//    }
//    render(){
//      return this.props.children
//    }
//  }
//  Provider.childContextTypes = {
//    store: React.PropTypes.object
//  }
```
我们得到了同样的效果！原来上一节通过context传递store的方法是Provider的源码实现！惊呆了。。。查看[Provider源码](https://github.com/reactjs/react-redux/blob/master/src/components/Provider.js):
```js
// ...
class Provider extends Component {
  getChildContext() {
    return { [storeKey]: this[storeKey], [subscriptionKey]: null }
  }

  constructor(props, context) {
    super(props, context)
    this[storeKey] = props.store;
  }

  render() {
    return Children.only(this.props.children)
  }
}
// ...
 Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired,
}
Provider.childContextTypes = {
  [storeKey]: storeShape.isRequired,
  [subscriptionKey]: subscriptionShape,
}
// ...
```
和我们写的还是有很大区别，但是核心作用我们上一节已经做到了。会用就好了，不纠结。[上一节](https://github.com/MothWillion/redux-todolist/tree/master/25-passing-the-store-down-implicitly-via-context) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/27-generating-containers-with-connect-from-react-redux-visibletodolist)