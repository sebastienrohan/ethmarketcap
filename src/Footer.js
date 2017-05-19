import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
  render() {
    return(
      <footer className="page-footer">
        <div className="row">
          <div className="col s12 m4">
            <div className="footer-text">
              Status: <span className={`connected-${this.props.connectionStatus === 'Connected to API'}`}>
                {this.props.connectionStatus}
              </span>
            </div>
          </div>
          <div className="col s12 m4 legend">
            <div className="orange-square"><div className="legend-element">Bitcoin</div></div>
            <div className="blue-square"><div className="legend-element">Ethereum</div></div>
            <div className="green-square"><div className="legend-element">Tokens</div></div>
          </div>
          <div className="col s12 m4">
            <div className="footer-text">
              <span className="right">
                Made by: <a
                  href="https://twitter.com/sebrohan"
                  target="_blank">@Sebrohan
                </a> with <a
                  href="https://coinmarketcap.com/"
                  target="_blank">Coinmarketcap API</a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
