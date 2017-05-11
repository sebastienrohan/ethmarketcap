import React, { Component } from 'react';
import $ from 'jquery';
import PieChart from './PieChart';
import './Charts.css';

// helper function
const objectToArray = function(objectIn) {
  let properties = Object.keys(objectIn);
  let values = Object.keys(objectIn).map(key => objectIn[key]);
  let arrayOut = [];
  for (let i = 0; i < Object.keys(objectIn).length; i++) {
    let newObjElement = {};
    newObjElement.name = properties[i];
    newObjElement.value = values[i];
    arrayOut.push(newObjElement);
  };
  return arrayOut;
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchData();
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
