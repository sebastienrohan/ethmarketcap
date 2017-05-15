import React, { Component } from 'react';
import $ from 'jquery';
import Charts from './Charts';
import Footer from './Footer';
import './Container.css';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {connectionStatus: 'Loading...'};
  }

  componentWillMount() {
    // fetch data from server every 10 seconds
    setInterval(this.fetchData.bind(this), 5000);
  }

  fetchData() {
    $.ajax({
      url: '/api/data',
      dataType: 'json',
      success: function(retrievedData) {
        this.setState({data: retrievedData, connectionStatus: 'Connected'});
      }.bind(this),
      error: function(xhr, status, err) {
        if (err === 'Internal Server Error' || err === 'Not Found') {
          this.setState({connectionStatus: 'Couldn\'t reach Coinmarketcap API'});
        } else {
          this.setState({connectionStatus: 'Couldn\'t connect to server'});
        }
      }.bind(this)
    });
  }

  render() {
    // render charts if data is received from server
    if (this.state.data) {
      return (
        <div className="Charts">
          <Charts data={this.state.data} />
          <Footer connectionStatus={this.state.connectionStatus} />
        </div>
      );
    } else {
      return (
        <Footer connectionStatus={this.state.connectionStatus} />
      );
    }
  }
}

export default Container;
