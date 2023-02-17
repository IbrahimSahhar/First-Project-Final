import React, { Component } from 'react'
import './orLine.css'

export default class OrLine extends Component {
  render() {
    return (
      <div className='or_box'>
        <div className='or_line'></div>
        <p className='or_text'>Or</p>
      </div>
    )
  }
}
