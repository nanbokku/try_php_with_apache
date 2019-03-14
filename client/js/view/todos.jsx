import { TodoView } from './todo.jsx';
import React from 'react';

export class TodosView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos,
    };

    this.props.model.addEventListener('added', todo => {
      this.add(todo.id, todo.contents);
    });
    this.props.model.addEventListener('deleted', index => {
      this.delete(index);
    });
    this.props.model.addEventListener('updated', index => {
      this.update(index, this.props.model[index]);
    });
  }

  render() {
    const todoNode = this.state.todos.map(todo => {
      return (
        <TodoView
          key={todo.id}
          isCompleted={todo.isCompleted}
          contents={todo.contents}
          id={todo.id}
          onChecked={(id, checked) => {
            this.props.onChecked(id, checked);
          }}
          onEdited={(id, contents) => {
            this.props.onEdited(id, contents);
          }}
        />
      );
    });

    return <div>{todoNode}</div>;
  }

  add(id, contents) {
    this.setState({ todos: this.state.todos.concat({ id: id, contents: contents, isCompleted: false }) });
  }

  update(index, data) {
    let updated = {};
    if ('contents' in data) {
      updated = { ...updated, contents: data.contents };
    }
    if ('isCompleted' in data) {
      updated = { ...updated, isCompleted: data.isCompleted };
    }

    const tmp = this.state.todos;
    tmp[index] = updated;
    this.setState({ todos: tmp });
  }

  delete(index) {
    const tmp = this.state.todos;
    tmp.splice(index, 1);
    this.setState({ todos: tmp });
  }
}
