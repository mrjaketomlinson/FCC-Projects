import React, { Component } from 'react';

class Buttons extends Component {
  render() {
    return (
      <div className="Buttons">
        <button className="big" id="clear" value="CE" onClick={this.props.init}>CE</button>
        <button className="big" id="equals" value="=" onClick={this.props.calculate}>=</button>
        <button className="numbers" id="seven" value="7" onClick={this.props.numbers}>7</button>
        <button className="numbers" id="eight" value="8" onClick={this.props.numbers}>8</button>
        <button className="numbers" id="nine" value="9" onClick={this.props.numbers}>9</button>
        <button id="multiply" value="x" onClick={this.props.operators}>x</button>
        <button className="numbers" id="four" value="4" onClick={this.props.numbers}>4</button>
        <button className="numbers" id="five" value="5" onClick={this.props.numbers}>5</button>
        <button className="numbers" id="six" value="6" onClick={this.props.numbers}>6</button>
        <button id="subtract" value="-" onClick={this.props.operators}>-</button>
        <button className="numbers" id="one" value="1" onClick={this.props.numbers}>1</button>
        <button className="numbers" id="two" value="2" onClick={this.props.numbers}>2</button>
        <button className="numbers" id="three" value="3" onClick={this.props.numbers}>3</button>
        <button id="add" value="+" onClick={this.props.operators}>+</button>
        <button className="big numbers" id="zero" value="0" onClick={this.props.numbers}>0</button>
        <button  id="decimal" value="." onClick={this.props.decimals}>.</button>
        <button id="divide" value="/" onClick={this.props.operators}>/</button>
      </div>
    );
  }
}

export default Buttons;
