import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./navbar.css";

export default class index extends Component {
  state = {
    isLogedOut: false,
  };

  render() {
    return (
      <nav>
        <p
          className="logout"
          onClick={() => {
            this.props.logout();
            this.setState({ isLogedOut: true });
          }}
        >
          Log Out
        </p>
        <Link className="my_info__nav" to='/dashboard/profile'>
          <div className="text">
            <p>
              Welcome back,
              <br />
              {this.props.firstName}!
            </p>
          </div>
          <div className="image">
            <img src={this.props.image} alt="your pic" />
          </div>
        </Link>

        {this.state.isLogedOut && <Navigate to='/login' />}
      </nav>
    );
  }
}
