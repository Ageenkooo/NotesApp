import React, { Component } from 'react';

class App extends Component {
  state = {notes: []}
  
  componentDidMount() {
    fetch('/notes')
      .then(res => res.json())
      .then(notes => this.setState({ notes }));
  }

  render() {
    return (
      <div className="App">
        <h1>Notes</h1>
        {this.state.notes.map(note =>
          <div key={note.id}>{note.name}</div>
        )}
      </div>
    );
  }
}

export default App;
