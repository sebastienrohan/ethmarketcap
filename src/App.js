import React, { Component } from 'react';
import Charts from './Charts';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Ethereum Ecosystem Market Cap</h1>
        </div>
        <Charts />
      </div>
    );
  }
}

export default App;