import React, { Component } from 'react';
import Container from './Container';
import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <span className="brand-logo">Ethereum Ecosystem Market Cap</span>
          </div>
        </nav>
        <Container />
      </div>
    );
  }
}

export default App;
