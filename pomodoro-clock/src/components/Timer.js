import React, { Component } from 'react';

class Timer extends Component {

  render() {
    if (this.props.start_stop === 'pause') {
      return (
        <div className="timer-button">
          <button id="start_stop" className="btn btn-default" onClick={this.props.start}>Start</button>
        </div>
      )
    } else {
      return (
        <div className="timer-button">
          <button id="start_stop" className="btn btn-default" onClick={this.props.stop}>Pause</button>
        </div>
      )
    }
  }
}

export default Timer;
