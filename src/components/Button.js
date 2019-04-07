import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
  isOperator = val => {
    return !isNaN(val) || val === "." || val === "," || val === "=" || val === "C";
  }

  render() {
    return (
      <button
        className={`button ${this.isOperator(this.props.children) ? "" : "operator"}`}
        onClick={() => this.props.handleClick(this.props.children)}
        onKeyDown={(e) => this.props.handleKeyDown(e)}
        >
        {this.props.children}
      </button>
    )
  }
}