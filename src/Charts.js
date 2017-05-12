import React, { Component } from 'react';
import $ from 'jquery';
import PieChart from './PieChart';
import './Charts.css';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(this.fetchData.bind(this), 5000);
  }

  fetchData() {
    $.ajax({
      url: '/api/data',
      dataType: 'json',
      success: function(retrievedData) {
console.log('retrievedData: ', retrievedData);
        this.setState({data: retrievedData});
console.log('new state: ', this.state.data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/data', status, err.toString());
      }.bind(this)
    });
  }

  render() {
console.log('charts rendered');
    if (this.state.data) {
console.log('charts rendered with state');
      return (
        <div className="Charts">
          <PieChart data={this.state.data} />
        </div>
      );
    }
    else {
console.log('charts rendered with loading');
      return (
        <div>Loading...</div>
      );
    }
  }
}

export default Charts;
