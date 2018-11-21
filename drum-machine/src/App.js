import React, { Component } from 'react';
import './App.css';

import DrumMachine from './components/DrumMachine';

const sounds = [{
  keyTrigger: 1,
  keyName: 'Q',
  id: 'DJ Lazer',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Lazer.mp3',
},
{
  keyTrigger: 2,
  keyName: 'W',
  id: 'DJ Lazer 2',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Lazer-2.mp3',
},
{
  keyTrigger: 3,
  keyName: 'E',
  id: 'DJ Lazer 3',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Lazer-3.mp3',
},
{
  keyTrigger: 4,
  keyName: 'A',
  id: 'DJ Scratch',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Scratch.mp3',
},
{
  keyTrigger: 5,
  keyName: 'S',
  id: 'DJ Scratch 2',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Scratch-2.mp3',
},
{
  keyTrigger: 6,
  keyName: 'D',
  id: 'DJ Scratch 3',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/DJ-Scratch-3.mp3',
},
{
  keyTrigger: 7,
  keyName: 'Z',
  id: 'Record Needle Scratch',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/Record-Needle-Scratch.mp3',
},
{
  keyTrigger: 8,
  keyName: 'X',
  id: 'Reverse Needle Scratch',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/Reverse-Needle-Scratch.mp3',
},
{
  keyTrigger: 9,
  keyName: 'C',
  id: 'Record Static',
  url: 'http://audiosoundclips.com/wp-content/uploads/2014/02/Record-Static.mp3',
},]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ''
    }
    this.playSound = this.playSound.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(message) {
    this.setState({display: message});
  }

  playSound = (val, id) => {
    const audio = document.getElementById(val);
		audio.currentTime = 0;
    audio.play();
    this.updateDisplay(id);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Drum Machine</h1>
          <p className="App-intro">Play those funky beats!</p>
        </header>
        <div id="drum-machine">
          <div id="display" className="display">
            {this.state.display}
          </div>
          <div id="drum-buttons" className="drum-buttons">
            {sounds.map((item)=>{
            return <DrumMachine play={this.playSound} id={item.id}
            keyName={item.keyName} url={item.url} keyTrigger={item.keyTrigger}
            sounds={sounds} updateDisplay={this.updateDisplay} />
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
