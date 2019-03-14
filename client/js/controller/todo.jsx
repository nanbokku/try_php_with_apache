import ReactDOM from 'react-dom';
import $ from 'jquery';
import { TodosView } from '../view/todos.jsx';
import { TodosModel } from '../model/todos.js';

export class TodoController {
  constructor() {
    this.todosModel = new TodosModel();

    // initialize
    $.get('/todo/all').done(res => {
      console.log(res);
      this.initialize(res);
    });
  }

  initialize(todos) {
    ReactDOM.render(
      <TodosView
        todos={todos}
        onChecked={(id, checked) => {
          $.ajax({
            method: 'POST',
            url: '/todo/' + id,
            data: JSON.stringify({ completed: checked }),
            dataType: 'json',
            contentType: 'application/json',
          }).done(res => {
            this.todosModel.update({ id: id, completed: checked });
          });
        }}
        onEdited={(id, contents) => {
          $.ajax({
            method: 'POST',
            url: '/todo/' + id,
            data: JSON.stringify({ contents: contents }),
            dataType: 'json',
            contentType: 'application/json',
          }).done(res => {
            this.todosModel.update({ id: id, contents: contents });
          });
        }}
      />,
      $('#todos').get(0)
    );
  }
}
