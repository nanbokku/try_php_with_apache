import React from 'react';

export class InputView extends React.Component {
  constructor(props) {
    this.input = '';
  }

  render() {
    return (
      <span>
        <input type="checkbox" />
        <input
          type="text"
          value={this.input}
          onKeyDown={event => {
            if (event.keyCode === 13 && /\S/g.test(this.input)) {
              this.props.onInputed(this.input);
              this.input = '';
            }
          }}
          onChange={event => {
            this.input = event.target.value;
          }}
        />
      </span>
    );
  }
}
