import React, { Component } from "react";
import "./style.css";

import { H2 } from "../../components/Typography";
import GameCard from "../../components/GameCard";
import LastPlayedItem from "../../components/LastPlayedItem";
import TrophyImg from "../../components/TrophyImg";

import games from "../../mock/games";
import lastPlayed from "../../mock/lastPlayed";

import TrophyBg from "../../assets/images/tyophyBg.png";
import Friends from "../../assets/images/friends.png";

const trophy = {
  background: TrophyBg,
  trophy: "perfect KILL streak",
  gameName: "assassin's creed odyssey",
  stat: "0.5",
  lastPlayed: "24 hours",
};

export default class Home extends Component {
  render() {
    return (
          <section className="new_games">
            <H2 text="NEW GAMES" />
            <div className="games_box">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  gameBg={game.gameBg}
                  gameLogo={game.gameLogo}
                  gameImg={game.gameImg}
                  text={game.text}
                  dir={game.dir}
                />
              ))}
            </div>

            <section className="columns">
              <div className="last_played">
                <H2 text="last played" />
                <ul className="lastPlayed__box">
                  {lastPlayed.map((item) => (
                    <LastPlayedItem
                      key={item.id}
                      gameImg={item.gameImg}
                      gameName={item.gameName}
                      number={item.number}
                      shadowColor={item.shadowColor}
                    />
                  ))}
                </ul>
              </div>
              <div className="recent_trophy">
                <H2 text="most recent trophy" />
                <TrophyImg
                  background={trophy.background}
                  gameName={trophy.gameName}
                  lastPlayed={trophy.lastPlayed}
                  trophy={trophy.trophy}
                  stat={trophy.stat}
                />
              </div>
              <div className="friends">
                <H2 text="friends" />
                <img src={Friends} alt="friends" />
              </div>
            </section>
          </section>
    );
  }
}
