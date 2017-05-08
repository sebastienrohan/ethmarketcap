import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {
  render() {
    let options = this.props.options;
    return (
      <div className="padded">
        { options.map((option) =>
          <span key={options.indexOf(option)}>
            <a href="#"
              onClick={() => this.props.handleClick(options.indexOf(option))}>
              {option}
            </a>
          </span>)
        }
      </div>
    );
  }
}

export default Controls;
