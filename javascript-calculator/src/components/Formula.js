import React, { Component } from 'react';

class Formula extends Component {
  render() {
    return (
      <div className="formula">
        {this.props.formula}
      </div>
    );
  }
}

export default Formula;
