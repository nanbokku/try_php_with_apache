import { Reactor } from '../utils/reactor.js';
import React from 'react';

export class TodoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };

    this.events = new Reactor();
    // this.template = _.template($('#template-todo').html());
    // this.$el = $('li');
  }

  render() {
    return (<li>
      <span>
        <input type="checkbox" checked={this.state.isChecked} 
          onChange={() => {
            this.setState({isChecked: this.checkbox.prop('checked')});
            {this.props.onChecked(this.state.isChecked)}}}
        >
        // this.events.dispatchEvent('checked', this.checkbox.prop('checked'));}
        <input type="text" value={this.state.contents} 
          onBlur={() => {
            // when textarea value is not blank
            if (/\S/g.test(this.editForm.val())) {
              this.setState({contents: this.editForm.val()});
              {this.props.onEdited({this.state.contents})}
            // this.events.dispatchEvent('edited', this.editForm.val());
            }
          }} 
          onKeydown={event => {
          // when push enter key or textarea value is not blank
          if (event.keyCode === 13 && /\S/g.test(this.editForm.val())) {
            this.setState({contents: this.editForm.val()});
            {this.props.onEdited({this.state.contents})}
            // this.events.dispatchEvent('edited', this.editForm.val());
          }
        }}
        >{this.state.contents}
      </span>
    </li>);
    
    {/* const tmp = this.template(this.model);
    // DOM化
    this.$el.html(tmp);

    // イベントの設定
    this.setEvents();

    return this.$el; */}
  }

  {/* setEvents() {
    this.checkbox = this.$el.find('input[type="checkbox"]');
    this.editForm = this.$el.find('input[type="text"]');

    this.checkbox.on('change', () => {
      this.events.dispatchEvent('checked', this.checkbox.prop('checked'));
    });

    this.editForm.on({
      blur: () => {
        // when textarea value is not blank
        if (/\S/g.test(this.editForm.val())) {
          this.events.dispatchEvent('edited', this.editForm.val());
        }
      },
      keydown: event => {
        // when push enter key or textarea value is not blank
        if (event.keyCode === 13 && /\S/g.test(this.editForm.val())) {
          this.events.dispatchEvent('edited', this.editForm.val());
        }
      }
    });

    this.$el.on('dblclick', () => {
      // trigger
    });
  } */}
}
