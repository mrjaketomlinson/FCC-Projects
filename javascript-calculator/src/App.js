import React, { Component } from 'react';

import Buttons from './components/Buttons';
import Display from './components/Display';
import Formula from './components/Formula';

import './App.css';

const operator = /[x/+-]/;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      previousValue: 0,
      formula: '',
    };
    this.init = this.init.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimals = this.handleDecimals.bind(this);
  }

  init() {
    // console.log("clear");
    this.setState({
      currentValue: 0,
      previousValue: 0,
      formula: '',
    });
  }

  handleNumbers(e) {
    if (this.state.previousValue === 0) {
      this.setState({
        formula: this.state.currentValue === "0" && e.target.value === "0" ?
          this.state.currentValue : this.state.formula === '' ?
          e.target.value : this.state.formula + e.target.value,
        currentValue: this.state.currentValue === "0" && e.target.value === "0" ?
          this.state.currentValue : this.state.currentValue === 0 || operator.test(this.state.currentValue) ?
          e.target.value : this.state.currentValue + e.target.value,
      });
      // console.log(operator.test(this.state.currentValue));
      // console.log(this.state.currentValue);
      // console.log("handleNumbers");
      // console.log(this.state);
    } else {
      this.setState({
        formula: this.state.previousValue,
      });
      this.setState({
        formula: this.state.currentValue === "0" && e.target.value === "0" ?
          this.state.currentValue : this.state.formula === '' ?
          e.target.value : this.state.formula + e.target.value,
        currentValue: this.state.currentValue === "0" && e.target.value === "0" ?
          this.state.currentValue : this.state.currentValue === 0 || operator.test(this.state.currentValue) ?
          e.target.value : this.state.currentValue + e.target.value,
      });
      // console.log("handleNumbers else");
      // console.log(this.state);
    }
  }

  handleOperators(e) {
    if (this.state.previousValue === 0) {
      this.setState({
        formula: this.state.formula === '' ?
          this.state.formula : operator.test(this.state.currentValue) ?
          this.state.formula.slice(0, -1) + e.target.value : this.state.formula + e.target.value,
        currentValue: e.target.value,
      });
      // console.log("handleOperators");
      // console.log(this.state);
    } else {
      this.setState({
        formula: this.state.formula === '' ?
          this.state.formula : operator.test(this.state.currentValue) ?
          this.state.formula.slice(0, -1) + e.target.value : this.state.formula + e.target.value,
        currentValue: e.target.value,
      });
      // console.log("handleOperators else");
      // console.log(this.state);
    }
  }

  handleDecimals(e) {
    // console.log("decimal button");
    if (!/\./g.test(this.state.currentValue)) {
      this.setState({
        formula: this.state.formula + e.target.value,
        currentValue: this.state.currentValue + e.target.value,
      });
      // console.log("decimal if", this.state.currentValue, /\./g.test(this.state.currentValue));
    } else {
      this.setState({
        formula: this.state.formula,
        currentValue: this.state.currentValue,
      });
      // console.log("decimal else");
    }
  }

  handleCalculate() {
    // console.log("Calculate");
    // console.log(this.state);
    let equation = this.state.formula;
    equation = equation.replace(/x/g, "*").replace(/-/g, '-');
    let answer = Math.round(10000 * eval(equation)) / 10000;
    this.setState({
      currentValue: answer.toString(),
      formula: answer.toString(),
      previousValue: answer
    });
    // console.log(this.state);
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">JavaScript Calculator</h1>
        </header>
        <p className="App-intro">
          Happy calculating!
        </p>
        <div id="calculator" className="calculator">
          <Formula formula={this.state.formula} />
          <Display currentValue={this.state.currentValue} />
          <Buttons init={this.init}
                 calculate={this.handleCalculate}
                 numbers={this.handleNumbers}
                 operators={this.handleOperators}
                 decimals={this.handleDecimals} />
        </div>
      </div>
    );
  }
}

export default App;
