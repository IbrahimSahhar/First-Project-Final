import React, { Component } from 'react'
import './iconButton.css'

export default class IconButton extends Component {
  render() {
    return (
      <a href={this.props.link} className='icon_btn shadow'>
        <img src={this.props.icon} alt={this.props.alt} />
      </a>
    )
  }
}
