import React, { Component } from "react";
import "./style.css";
import axios from "axios";

import { Link, Navigate } from "react-router-dom";
import { H2 } from "../../components/Typography";

import Loading from "../../components/Loading";

export default class Users extends Component {
  state = {
    isAuth: true,
    isAdmin: true,
    user: {},
    users: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const user = JSON.parse(localStorage.getItem("gamerUser"));
    if (!user) {
      this.setState({ isAuth: false });
    } else {
      this.setState({ user, isAdmin: user.isAdmin });
      if (user.isAdmin) {
        try {
          const res = await axios.get(
            `https://react-tt-api.onrender.com/api/users`,
            { headers: { Authorization: `Bearer ${user.token}` } }
          );

          this.setState({ users: res.data });
        } catch (err) {
          console.log(err);
        } finally {
          this.setState({ isLoading: false });
        }
      }
    }
  }

  deleteUser = async (id) => {
    if (id !== this.state.user._id) {
      try {
        await axios.delete(
          `https://react-tt-api.onrender.com/api/users/${id}`,
          { headers: { Authorization: `Bearer ${this.state.user.token}` } }
        );
        this.props.alertOpen(
          `User ${id} has been deleted`,
          "Success",
          "success",
          5000
        );
        let newUsers = this.state.users.filter((user) => user._id !== id);
        this.setState((prev) => ({ users: [...newUsers] }));
      } catch (err) {
        console.log(err);
      }
    } else {
      this.props.alertOpen(
        "You can't delete your self",
        "Error",
        "error",
        5000
      );
    }
  };

  render() {
    return (
      <div>
        {!this.state.isAuth ? <Navigate to="/login" /> : ""}
        {!this.state.isAdmin ? <Navigate to="/dashboard" /> : ""}
        {this.state.isLoading && <Loading />}
        <H2 text="Users" />

        <section className="users__list">
          {this.state.users.map((item) => (
            <ul className="user_info">
              <li>
                Name : <span>{item.name}</span>
              </li>
              <li>
                Email : <span>{item.email}</span>
              </li>
              <li>
                Roles : <span>{item.isAdmin ? "Admin" : "User"}</span>
              </li>
              <li className="control">
                <Link className="view" to={`/dashboard/users/${item._id}`}>
                  View
                </Link>
                <Link
                  className="delete"
                  style={{ color: "red" }}
                  onClick={() => this.deleteUser(item._id)}
                >
                  Delete
                </Link>
              </li>
            </ul>
          ))}
        </section>
      </div>
    );
  }
}
