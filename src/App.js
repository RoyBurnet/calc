import React, { Component } from 'react';

import Button from './components/Button';
import DisplayValue from './components/DisplayValue';
import ClearButton from './components/ClearButton';

import operations from './helpers/operations';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: null,
      displayValue: '0',
      operatorPressed: false,
      operator: null,
      previousNumber: "",
      nextNumber: ""

    }
  };

  // Inputs
  inputNumber = number => {
    const { displayValue, operatorPressed} = this.state

    if(operatorPressed){
      this.setState({
        displayValue: String(number),
        operatorPressed: false,
      });
    } else {
      this.setState({
        displayValue:  displayValue === '0'  ? String(number) : displayValue + number
      });
  }
};

  inputDot = () => {
    const { displayValue, operatorPressed } = this.state;

    if(operatorPressed){
      this.setState({
        displayValue: '.',
        operatorPressed: false
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
        operatorPressed: false
      })
    };
  };

  inputPercent = () => {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);

    this.setState({
      displayValue: String(value / 100)
    });
  };

  inputSqr = () => {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);

    this.setState({
      displayValue: Math.sqrt(parseFloat(value))
    });
  };

  addZeroToInput = val => {
    if(this.state.displayValue !== ""){
      this.setState({displayValue: this.state.displayValue + val})
    };
  };

  isToggleSign = () =>{
    const {displayValue} = this.state;

    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    });
  };

  // Operators
  performOperation = (nextOperator) => {
    const { displayValue, value, operator } = this.state;
    const inputValue = parseFloat(displayValue)

    if(value === null ){
        this.setState({
          value: inputValue,
        })
        if(nextOperator === "^"){
          this.setState({
            value: displayValue,
            displayValue: `${inputValue} ${nextOperator}`
          })
        }
    } else if (operator){
      const currentNumber = value || 0
      const newValue = operations[operator](currentNumber, inputValue);;
      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }
    this.setState({
      operatorPressed: true,
      operator: nextOperator,
    })
  }

  // Clear
  clearInput = () => {
    this.setState({
    value: null,
    displayValue: '0',
    operator: null,
    operatorPressed: false
  })
}

clearAll = () => {
  this.setState({
    displayValue: '0'
  })
}

  clearLastChar() {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

//keyboard
  handleKeyDown = (event) => {
    let { key } = event;

    if (key === 'Enter');
      key = '='

      if ((/\d/).test(key)){
        event.preventDefault();
        this.handleKeyDown(parseInt(key, 10))
        this.inputNumber(key);
      } else if(key in operations){
        event.preventDefault();
        this.performOperation(key)
      } else if (key === '.'){
        event.preventDefault();
        this.inputDot();
      } else if (key === '%'){
        event.preventDefault();
        this.inputPercent();
      } else if (key === 'Backspace'){
        event.preventDefault();
        this.clearLastChar();
      } else if (key === 'Tab'){
        event.preventDefault();
        this.clearInput();
      }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  };

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <DisplayValue>{this.state.displayValue}</DisplayValue>
          </div>
          <div className="row">
            <Button handleClick={this.inputSqr}>√</Button>
            <Button handleClick={this.performOperation}>^</Button>
            <Button handleClick={this.isToggleSign}>+/-</Button>
            <Button handleClick={this.inputPercent}>%</Button>
          </div>
          <div className="row">
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>7</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>8</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>9</Button>
            <Button handleClick={this.performOperation}>÷</Button>
          </div>
          <div className="row">
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>4</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>5</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>6</Button>
            <Button handleClick={this.performOperation}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>1</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>2</Button>
            <Button handleClick={this.inputNumber} handleKeyDown={this.handleKeyDown}>3</Button>
            <Button handleClick={this.performOperation}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.inputDot}>.</Button>
            <Button handleClick={this.addZeroToInput} handleKeyDown={this.handleKeyDown}>0</Button>
            <Button handleClick={this.clearAll}>C</Button>
            <Button handleClick={this.performOperation}>-</Button>
          </div>
          <div className="row">
          <ClearButton handleClear={this.clearInput}>AC</ClearButton>
          <Button handleClick={this.performOperation}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
