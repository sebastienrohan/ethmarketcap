import React, { Component } from 'react';
import './PieChart.css';

class PieChart extends Component {
  render() {
    let data = this.props.data;

    return (
      <div className="row">
        <div className="col s6 left-align">
          <h4>{this.props.option}</h4>
          <ul>
            { data.map((datum) => <li key={data.indexOf(datum)}>
              {datum.name} : {datum.value}
            </li>) }
          </ul>
        </div>
      </div>
    );
  }
}

export default PieChart;
