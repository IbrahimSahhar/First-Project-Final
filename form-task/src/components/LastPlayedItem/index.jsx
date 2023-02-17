import React, { Component } from "react";
import "./lastPlayedItem.css";

export default class LastPlayedItem extends Component {

  state = {
    hover : 'none'
  }

  addHover = () => {
    this.setState({hover : `drop-shadow(0px 0px 10.6px ${this.props.shadowColor || '#000000'})`})
  } 

  removeHover = () => {
    this.setState({hover : `none`})
  }

  render() {
    return (
      <li className="lastPlayed__item">
        <img
          src={this.props.gameImg}
          alt="game pic"
          className="lastPlayed__image"
          onMouseEnter={this.addHover}
          onMouseLeave={this.removeHover}
          style={{filter: this.state.hover}}
        />
        <p className="lastPlayed__text">
          {this.props.gameName}, {this.props.number}
        </p>
      </li>
    );
  }
}
