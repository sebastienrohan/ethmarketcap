import React, { Component } from 'react';
import $ from 'jquery';
import Charts from './Charts';
import Footer from './Footer';
import './container.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {connectionStatus: 'Loading...'};
  }

  componentWillMount() {
    setTimeout(this.fetchData.bind(this), 500);
    // fetch data from server every 5 minutes
    setInterval(this.fetchData.bind(this), 300000);
  }

  fetchData() {
    $.ajax({
      url: '/api/data',
      dataType: 'json',
      success: function(retrievedData) {
        this.setState({data: retrievedData, connectionStatus: 'Connected to API'});
      }.bind(this),
      error: function(xhr, status, err) {
        if (err === 'Internal Server Error' || err === 'Not Found') {
          this.setState({data: {}, connectionStatus: 'Couldn\'t reach Coinmarketcap API'});
        } else {
          this.setState({data: {}, connectionStatus: 'Couldn\'t connect to server'});
        }
      }.bind(this)
    });
  }

  render() {
    // render charts if data is received from server
    if (this.state.data) {
      return (
        <div >
          <Charts data={this.state.data} />
          <Footer connectionStatus={this.state.connectionStatus} />
        </div>
      );
    } else {
      return (
        <div>
          <img
            src="./ethereum.png"
            alt="Ethereum logo"
            className="responsive-img loader"
          />
          <Footer connectionStatus={this.state.connectionStatus} />
        </div>
      );
    }
  }
}

export default Container;
