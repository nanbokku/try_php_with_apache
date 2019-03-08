import { TodoView } from './todo';

export class TodosView {
  constructor(model) {
    this.views = [];
    this.model = model;
    this.$el = $('#todos');
  }

  render() {
    // 初期化
    this.$el.html('');
    this.views = [];

    this.model.todos.forEach(todo => {
      const view = new TodoView(todo);

      // add event listener

      this.views.push(view);
      this.$el.append(view);
    });
  }

  add() {}

  update(index) {
    const todo = this.model.todos[index];
    const view = new TodoView(todo);

    // add event listener

    this.views[index] = view;
  }

  delete(index) {
    this.views.splice(index, 1);
  }
}
