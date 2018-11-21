import React, { Component } from 'react';

class Display extends Component {
  render() {
    return (
      <div id="display" className="display">
        {this.props.currentValue}
      </div>
    );
  }
}

export default Display;
