export class TodoView {
  constructor(model) {
    this.model = model;
    this.template = _.template($('#template-todo').html());
    this.$el = $('li');
  }

  render() {
    const tmp = this.template(this.model);
    // DOM化
    this.$el.html(tmp);

    // イベントの設定
    this.setEvents();

    return this.$el;
  }

  setEvents() {
    this.checkbox = this.$el.find('input[type="checkbox"]');
    this.editForm = this.$el.find('input[type="text"]');

    this.checkbox.on('change', () => {
      // trigger
    });

    this.editForm.on({
      blur: () => {
        //trigger
      },
      keydown: () => {
        //trigger
      }
    });

    this.$el.on('dblclick', () => {
      //trigger
    });
  }
}
