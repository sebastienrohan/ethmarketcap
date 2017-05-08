import React, { Component } from 'react';
import './PieChart.css';

class PieChart extends Component {
  render() {
    let myData = [{
      angle: 1,
      label: 'A'
    },
    {
      angle: 2,
      label: 'B'
    },
    {
      angle: 3,
      label: 'C'
    }];

    return (
      <div className="row">
        <div className="col s6 left-align">
          <h4>{this.props.option}</h4>
          <ul>
            { myData.map((datum) => <li key={myData.indexOf(datum)}>
              Label: {datum.label} | Value : {datum.angle}
            </li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default PieChart;
