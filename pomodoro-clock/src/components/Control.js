import React, { Component } from 'react';

class Control extends Component {

  render() {
    if (this.props.phase === 'work') {
      return (
        <div className="control">
          <h2 id="timer-label">Session</h2>
          <p id="session-label">Session Length</p>
          <div className="session-settings">
            <button type="button" className="fa fa-minus-circle" id="session-decrement" value="-" onClick={this.props.setSessionLength}></button>
            <p id="session-length">{this.props.sessionLength}</p>
            <button className="fa fa-plus-circle" id="session-increment" value="+" onClick={this.props.setSessionLength}></button>
          </div>
          <p id="break-label">Break Length</p>
          <div className="break-settings">
            <button className="fa fa-minus-circle" id="break-decrement" value="-" onClick={this.props.setBreakLength}></button>
            <p id="break-length">{this.props.breakLength}</p>
            <button className="fa fa-plus-circle" id="break-increment" value="+" onClick={this.props.setBreakLength}></button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="control">
          <h2 id="timer-label">Break</h2>
          <p id="session-label">Session Length</p>
          <div className="session-settings">
            <button className="fa fa-minus-circle" id="session-decrement" value="-" onClick={this.props.setSessionLength}></button>
            <p id="session-length">{this.props.sessionLength}</p>
            <button className="fa fa-plus-circle" id="session-increment" value="+" onClick={this.props.setSessionLength}></button>
          </div>
          <p id="break-label">Break Length</p>
          <button className="fa fa-minus-circle" id="break-decrement" value="-" onClick={this.props.setBreakLength}></button>
          <p id="break-length">{this.props.breakLength}</p>
          <button className="fa fa-plus-circle" id="break-increment" value="+" onClick={this.props.setBreakLength}></button>
        </div>
      );
    }
  }
}

export default Control;
