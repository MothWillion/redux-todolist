### 用React-Redux的 connect API生成容器组件 FilterLink
```js
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter===state.visibilityFilter
  }
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: ()=>{
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  }
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)
```
mapStateToProps(state,ownProps)、mapStateToProps(dispatch,ownProps)。其实很简单~ [上一节](https://github.com/MothWillion/redux-todolist/tree/master/28-generating-containers-with-connect-from-react-redux-addtodo) [下一节](https://github.com/MothWillion/redux-todolist/tree/master/30-extracting-action-creators)