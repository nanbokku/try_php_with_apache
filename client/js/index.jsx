import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { TodoController } from './controller/todo.jsx';
// import { TodosView } from './view/todos.jsx';

$(() => {
  const controller = new TodoController();

  // ReactDOM.render(
  //   <TodosView
  //     todos={[{ id: 1, contents: 'hello', isCompleted: false }, { id: 2, isCompleted: false, contents: 'world!' }]}
  //     onChecked={(id, checked) => {
  //       console.log(id + ', ' + checked);
  //     }}
  //     onEdited={(id, contents) => {
  //       console.log(id + ', ' + contents);
  //     }}
  //   />,
  //   $('#todos').get(0)
  // );
});
