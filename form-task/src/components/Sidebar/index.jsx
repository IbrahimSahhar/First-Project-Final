import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import Like from "../../assets/images/like.svg";
import Setting from "../../assets/images/Settings.svg";
import Puzzle from "../../assets/images/Puzzle.svg";
import Moon from "../../assets/images/Moon.svg";
import Sun from "../../assets/images/Sun-one.svg";

import "./sidebar.css";

export default class Sidebar extends Component {
  render() {
    return (
      <aside>
        <div className="sidebar__logo">
          <NavLink to="/dashboard">
            <img src={Logo} alt="logo" />
          </NavLink>
        </div>

        <ul className="sidebar__links">
          <li>
            <NavLink to="/dashboard/profile">
              <img src={Like} alt="heart" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users">
              <img src={Setting} alt="settings" />
            </NavLink>
          </li>
          <li>
            <NavLink to="#">
              <img src={Puzzle} alt="puzzle" />
            </NavLink>
          </li>
        </ul>

        <div className="sidebar__themes">
          <div className="sidebar__themes_toggler">
            <div className="sidebar__themes_toggle_item">
              <img src={Moon} alt="dark" />
            </div>
            <div className="sidebar__themes_toggle_item">
              <img src={Sun} alt="light" />
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
