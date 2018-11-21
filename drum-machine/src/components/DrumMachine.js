import React, { Component } from 'react';

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.keyTrigger === this.props.keyTrigger) {
     this.props.play(this.props.keyName, this.props.id);
     this.props.updateDisplay(this.props.id);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return (
      <div className="drum-pad" id={this.props.id}
        onClick={() => {this.props.play(this.props.keyName, this.props.id)}}>
          {this.props.keyName}
          <audio id={this.props.keyName} className="clip" src={this.props.url} type="audio/mpeg" />
        </div>
    );
  }
}

export default DrumMachine;
