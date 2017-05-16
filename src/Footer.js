import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return(
      <footer className="page-footer">
        <div className="row">
          Status: <span className={`connected-${this.props.connectionStatus === 'Connected to API'}`}>
            {this.props.connectionStatus}
          </span>
          <span className="right">
            Credits: <a href="https://coinmarketcap.com/" target="_blank">Coinmarketcap</a> & <a href="https://twitter.com/sebrohan" target="_blank">@Sebrohan</a>
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
