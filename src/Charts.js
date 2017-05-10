import React, { Component } from 'react';
import $ from 'jquery';
import Controls from './Controls';
import PieChart from './PieChart';
import './Charts.css';

class Charts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: 0,
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    $.ajax('/api/data').done(
      function(retrievedData) {
console.log("retrievedData: ", retrievedData);
console.log("retrievedData length: ", retrievedData.length);
        let names = Object.keys(retrievedData);
console.log("names: ", names);
        let values = Object.keys(retrievedData).map(key => retrievedData[key]);
console.log("values: ", values);
        let cleanedData = [];
        for (let i = 0; i < Object.keys(retrievedData).length; i++) {
          let newObjElement = {};
          newObjElement.name = names[i];
          newObjElement.value = values[i];
          cleanedData.push(newObjElement);
        };
console.log('cleanedData: ', cleanedData);
        this.setState({data: cleanedData});
      }.bind(this)
    );
  }

  handleClick(o) {
    let filteredData = this.state.data;
    switch (o) {
      case 1:
        filteredData = filteredData.slice(1);
        break;
      case 2:
        filteredData.slice(2);
        break;
      case 3:
        filteredData.slice(3);
        break;
      default:
        this.setState({data: filteredData});
    }
    this.setState({data: filteredData});
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
        <PieChart option={this.state.option} data={this.state.data}/>
      </div>
    );
  }
}

export default Charts;
