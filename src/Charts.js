import React, { Component } from 'react';
import Controls from './Controls';
import PieChart from './PieChart';
import './Charts.css';

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {option: 0};
  }

  handleClick(o) {
    this.setState({option: o});
  }

  render() {
    const options = [
      'Crypto',
      'Ethereum + tokens',
      'Ethereum',
      'Tokens'
    ];

    return (
      <div className="Charts">
        <div className="row">
          <div className="col s12 center-align">
            <Controls options={options} handleClick={this.handleClick.bind(this)} />
          </div>
        </div>
        <PieChart option={this.state.option}/>
      </div>
    );
  }
}

export default Charts;
