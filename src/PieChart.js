import React, { Component } from 'react';
import './PieChart.css';

class PieChart extends Component {
  render() {
console.log('pie rendered with data');
  let data = this.props.data;
console.log('data: ', data);
    return (
      <div className="row">
        <div className="col s6 left-align">
          {data.map((coin) =>
            <div>
              <h4>
                {coin.name}
              </h4>
              <div>{coin.marketcap}</div>
              <div>{coin.change}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PieChart;
