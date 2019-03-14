import React from 'react';

export class TodoView extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isCompleted: this.props.isCompleted,
    //   contents: this.props.contents,
    // };

    this.isCompleted = this.props.isCompleted;
    this.contents = this.props.contents;
  }

  render() {
    return (
      <li>
        <span>
          <input
            type="checkbox"
            checked={this.isCompleted}
            onChange={() => {
              // this.setState({ isCompleted: !this.state.isCompleted });
              this.isCompleted = !this.isCompleted;
              this.props.onChecked(this.props.id, this.isCompleted);
            }}
          />
          <input
            type="text"
            value={this.contents}
            onBlur={() => {
              // when textarea value is not blank
              if (/\S/g.test(this.contents)) {
                // this.setState({ contents: this.state.contents });
                this.props.onEdited(this.props.id, this.contents);
              }
            }}
            onKeyDown={event => {
              // when push enter key or textarea value is not blank
              if (event.keyCode === 13 && /\S/g.test(this.contents)) {
                // this.setState({ contents: this.state.contents });
                this.props.onEdited(this.props.id, this.contents);
              }
            }}
            onChange={event => {
              // when change contents
              // this.setState({ contents: event.target.value });
              this.contents = event.target.value;
            }}
          />
          {this.contents}
        </span>
      </li>
    );
  }
}
