import React, { Component } from 'react'
import './DisplayValue.css'

export default class DisplayValue extends Component {

  render() {
    return (
      <div className="display">
      {this.props.children}
      </div>
    )
  }
}