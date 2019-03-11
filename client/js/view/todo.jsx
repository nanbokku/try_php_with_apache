import React from 'react';

export class TodoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: this.props.isCompleted,
      contents: this.props.contents,
    };
  }

  render() {
    return (
      <li>
        <span>
          <input
            type="checkbox"
            checked={this.state.isCompleted}
            onChange={() => {
              this.setState({ isCompleted: !this.state.isCompleted });
              {
                this.props.onChecked(this.props.id, this.state.isCompleted);
              }
            }}
          />
          <input
            type="text"
            value={this.state.contents}
            onBlur={() => {
              // when textarea value is not blank
              if (/\S/g.test(this.state.contents)) {
                this.setState({ contents: this.state.contents });
                {
                  this.props.onEdited(this.props.id, this.state.contents);
                }
              }
            }}
            onKeyDown={event => {
              // when push enter key or textarea value is not blank
              if (event.keyCode === 13 && /\S/g.test(this.state.contents)) {
                this.setState({ contents: this.state.contents });
                {
                  this.props.onEdited(this.props.id, this.state.contents);
                }
              }
            }}
            onChange={event => {
              // when change contents
              this.setState({ contents: event.target.value });
            }}
          />
          {this.state.contents}
        </span>
      </li>
    );
  }
}
