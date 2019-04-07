import React, { Component } from 'react'
import './ClearButton.css'

export default class ClearButton extends Component {
  render() {
    return (
      <button className="clear-btn"
        onClick={() => this.props.handleClear()}
      >
        {this.props.children}
      </button>
    )
  }
}
