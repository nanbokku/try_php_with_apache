export class TodosModel {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);

    // trigger
  }

  get(id) {
    const index = this.findIndex(id);
    return this.todos[index];
  }

  delete(id) {
    const index = this.findIndex(id);
    this.todos.splice(index, 1);

    // trigger
  }

  update(todo) {
    const index = this.findIndex(todo.id);
    this.todos[index] = todo;

    // trigger
  }

  findIndex(id) {
    return this.todos.findIndex(todo => {
      return todo.id === id;
    });
  }
}
