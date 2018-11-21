import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';

let body = document.querySelector('body');
function randomBackground() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  body.style.backgroundColor = rgb;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [
        {
          id: uuid.v4(),
          text: "Don't cry because it's over, smile because it happened.",
          author: "Dr. Seuss",
        },
        {
          id: uuid.v4(),
          text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
          author: "Albert Einstein",
        },
        {
          id: uuid.v4(),
          text: "Be yourself; everyone else is already taken.",
          author: "Oscar Wilde",
        },
        {
          id: uuid.v4(),
          text: "So many books, so little time.",
          author: "Frank Zappa",
        },
        {
          id: uuid.v4(),
          text: "A room without books is like a body without a soul.",
          author: "Marcus Tullius Cicero",
        },
        {
          id: uuid.v4(),
          text: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
          author: "Bernard M. Baruch",
        },
      ],
      randomIndex: '0',
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      randomIndex: Math.floor(Math.random() * 6),
    });
    randomBackground();
  }

  render() {
    let randQuote = this.state.quotes[this.state.randomIndex];
    let tweet = 'http://twitter.com/intent/tweet?text=' + randQuote.text + ' - ' + randQuote.author;
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/28-gon-dissection-random.svg/2000px-28-gon-dissection-random.svg.png" className="App-logo" alt="logo" />
          <h1 className="App-title">The Random Quote Machine</h1>
        </header>
        <div id="quote-box" className="quote-box">
          <div id="quote-text">
            <i className="fa fa-quote-left"></i>
            <span id="text">{randQuote.text}</span>
            <i className="fa fa-quote-right"></i>
          </div>
          <div id="quote-author">
            <h4 id="author">- {randQuote.author}</h4>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <a href={tweet} target="_blank" id="tweet-quote"><button className="btn btn-default"><i className="fa fa-twitter"></i> Tweet this!</button></a>
            </div>
            <div className="col-xs-6">
              <button onClick={this.handleClick} id="new-quote" className="btn btn-default">New Quote!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
