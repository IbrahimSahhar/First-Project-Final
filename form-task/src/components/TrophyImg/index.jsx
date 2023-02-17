import React, { Component } from 'react'
import './trophyImg.css'

import Trophy from '../../assets/images/trophy.png'

export default class index extends Component {
  render() {
    return (
      <div className='trophy_box'>
        <img src={this.props.background} alt="game background" className='bg'/>

        <div className="green_circel"></div>
        <img src={Trophy} alt="trophy" className="trophy_picture" />

        <div className="trophy_stat_text">
            <p className='trophy_name'>{this.props.trophy}</p>
            <p className='trophy_my_stat'>you are in the {this.props.stat}%</p>
        </div>
        <div className="trophy_game_text">
            <p className='trophy_game_name'>{this.props.gameName}</p>
            <p className='trophy_lastPlayed'>last played: {this.props.lastPlayed} ago</p>
        </div>
      </div>
    )
  }
}
