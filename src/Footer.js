import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return(
      <div>
        Status: {this.props.connectionStatus}
      </div>
    );
  }
}

export default Footer;
