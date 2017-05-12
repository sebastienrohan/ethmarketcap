import React, { Component } from 'react';
import './Charts.css';

class Charts extends Component {
  render() {
  let data = this.props.data;
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

export default Charts;
