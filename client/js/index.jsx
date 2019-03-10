import { TodoView } from './view/todo.jsx';
import React from 'react';
import $ from 'jquery';

window.onload = () => {
  class App extends React.Component {
    render() {
      return <p> Hello React!</p>;
    }
  }

  React.render(<App />, document.getElementById('app'));
  // React.render(
  //   <TodoView onChecked={() => console.log("checked");} onEdited={()=>console.log("edited");} />,
  //   $('#todos').get(0)
  // )
};
