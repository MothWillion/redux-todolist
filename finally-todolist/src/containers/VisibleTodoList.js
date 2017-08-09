import React from 'react'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { getVisibleTodos } from '../reducers/getVisibleTodos'
import { toggleTodo } from '../actions'

const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

export default VisibleTodoList