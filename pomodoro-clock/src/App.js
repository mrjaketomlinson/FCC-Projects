import React, { Component } from 'react';

import Control from './components/Control';
import Timer from './components/Timer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 25,
      break: 5,
      timer: 1500,
      counter: 0,
      start_stop: 'pause',
      phase: 'work',
    };
    this.setSessionLength = this.setSessionLength.bind(this);
    this.setBreakLength = this.setBreakLength.bind(this);
    this.reset = this.reset.bind(this);
    this.clock = this.clock.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  setSessionLength(e) {
    if (e.target.value === '+') {
      console.log("increment session");
      this.setState({
        session: this.state.session < 60 ? this.state.session + 1 : 60,
        timer: this.state.timer < 3600 ? this.state.timer + 60 : 3600,
      });
    }
    if (e.target.value === '-') {
      console.log("decrement session");
      this.setState({
        session: this.state.session > 1 ? this.state.session - 1 : 1,
        timer: this.state.timer > 60 ? this.state.timer - 60 : 60,
      });
    }
  }

  setBreakLength(e) {
    if (e.target.value === '+') {
      console.log("increment break");
      this.setState({
        break: this.state.break < 60 ? this.state.break + 1 : 60,
      });
    }
    if (e.target.value === '-') {
      console.log("decrement break");
      this.setState({
        break: this.state.break > 1 ? this.state.break - 1 : 1,
      });
    }
  }

  reset() {
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
    clearInterval(this.counter);
    this.setState({
      session: 25,
      break: 5,
      timer: 1500,
      counter: 0,
      start_stop: 'pause',
      phase: 'work',
    });
  }

  clock() {
    let mins = Math.floor(this.state.timer / 60);
    let secs = this.state.timer - mins * 60;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
    return mins + ':' + secs;
  }

  countDown() {
    console.log("countDown clicked")
    let seconds = this.state.timer - 1;
    this.setState({
      timer: seconds,
    });
    if (this.state.timer === -1 && this.state.phase === 'work'){
      this.audioBeep.play();
      this.setState({
        timer: this.state.break * 60,
        phase: 'break'
      });
    }
    if (this.state.timer === -1 && this.state.phase === 'break') {
      this.audioBeep.play();
      this.setState({
        timer: this.state.session * 60,
        phase: 'work'
      });
    }
  }

  start() {
    this.counter = setInterval(this.countDown, 1000);
    this.setState({
      start_stop: 'start'
    });
  }

  stop() {
    clearInterval(this.counter);
    this.counter = 0;
    this.setState({
      start_stop: 'pause'
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pomodoro Clock</h1>
        </header>
        <p className="App-intro">
          To get started, choose the session length and break length. Then, begin your productive time!
        </p>
        <div className="pomodoro">
          <Control setSessionLength={this.setSessionLength}
                 setBreakLength={this.setBreakLength}
                 sessionLength={this.state.session}
                 breakLength={this.state.break}
                 phase={this.state.phase} />

          <div id="time-left">{this.clock()}</div>

          <div className="timer">
            <Timer start={this.start}
               stop={this.stop}
               clock={this.clock}
               start_stop={this.state.start_stop} />
            <button id="reset" className="btn btn-default" onClick={this.reset}>Reset</button>
            <audio id="beep" preload="auto" src="https://bit.ly/2MUBvpa" ref={(audio) => { this.audioBeep = audio; }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
