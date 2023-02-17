import React, { Component } from 'react'
import './gameCard.css'

import { Body } from '../Typography'

export default class GameCard extends Component {
  render() {
    return (
      <div className={`game_card ${this.props.dir === 'rtl' ? 'rtl' : ''}`} style={{backgroundImage : `url(${this.props.gameBg})`}}>
        <div className="side1">
            <div className="game_image">
              {
                this.props.gameImg ? <img src={this.props.gameImg} alt="game character" /> : ''
              }
            </div>
        </div>
        <div className="side2">
            <div className="game_logo">
              {
                this.props.gameLogo ? <img src={this.props.gameLogo} alt="game logo" /> : ''
              }
                
            </div>
            <div className="text">
                {
                  this.props.text ? <Body text={this.props.text} /> : ''
                }
            </div>
        </div>
      </div>
    )
  }
}
