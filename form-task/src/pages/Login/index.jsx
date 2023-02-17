import React, { Component } from "react";
import "./login.css";

import Logo from "../../assets/images/logoblue.png";
import Gear from "../../assets/images/gear.png";

import Container from "../../components/container";
import { Body, H1 } from "../../components/Typography";
import IconButton from "../../components/IconButton";

import OrLine from "../../components/OrLine";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../components/ScrollToTop";
import icons from "../../mock/icons";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoggingIn: false,
    isLoading: false,
    userId: null,
    error: false,
    messageOfError: "",
    classnames: "",
    styleOfCard: {
      top: "-100%",
    },
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("gamerUser"));
    if (user) {
      this.setState({ isLoggingIn: true });
    }
  }

  handelEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handelPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  sendData = async (e) => {
    window.scrollTo({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
    e.preventDefault();
    this.setState({
      styleOfCard: {
        top: "700px",
      },
      classnames: "",
    });
    this.setState({ isLoading: true });
    try {
      const res = await axios.post(
        `https://react-tt-api.onrender.com/api/users/login`,
        { email: this.state.email, password: this.state.password }
      );
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("gamerUser", JSON.stringify(res.data));
        this.props.login(res.data);
        this.setState({
          isLoggingIn: true,
          userId: res.data._id,
          error: false,
          messageOfError: "successfully!",
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({
        error: true,
        messageOfError: "This email or password is incorrect",
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  scale = () => {
    this.setState({
      classnames: "scale-out",
    });
    window.setTimeout(() => {
      window.scrollTo({
        top: 200,
        left: 0,
        behavior: "smooth",
      });
      this.setState({
        styleOfCard: {
          top: "-100%",
        },
      });
    }, 200);
  };
  render() {
    return (
      <div className="login_page">
        <div className="login_left">
          <img src={Logo} className="logo" alt="logo" />
          <p className="quts_mark">“</p>
          <p className="quts_text">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <h5 className="author">Hideo Kojima</h5>
          <img src={Gear} alt="gear" className="gear_img" />
        </div>

        <div className="login_right">
          <Container>
            <div className="titles">
              <H1 text="Join the game!" />
              <Body text="Go inside the best gamers social network!" />
            </div>

            <div className="icons_box">
              <div className="line"></div>
              {icons.map((item) => (
                <IconButton
                  icon={item.src}
                  alt={item.alt}
                  link={item.link}
                  key={item.id}
                />
              ))}
            </div>
            <OrLine />
            <form onSubmit={this.sendData}>
              <Input
                label="Your Email"
                value={this.state.email}
                type="email"
                id="email"
                placeholder="Write your email"
                returnValue={this.handelEmail}
              />
              <Input
                label="Enter your password"
                value={this.state.password}
                type="password"
                id="password"
                placeholder="•••••••••"
                returnValue={this.handelPassword}
              />
              <Button
                text={this.state.isLoading ? "Loading ..." : "Login"}
                classes={`btn btn-primary mt ${
                  this.state.isLoading ? "btn_loading" : ""
                }`}
              />
              <p className="create_account">
                Don’t have an account?
                <ScrollToTop>
                  <Link to="/signup">Register</Link>
                </ScrollToTop>
              </p>
            </form>
          </Container>
        </div>
        <Card
          Classes={this.state.classnames}
          Method={this.scale}
          ErrorMassage={this.state.messageOfError}
          Type={this.state.error}
          Style={this.state.styleOfCard}
          Href="/dashboard"
        />
        {this.state.isLoggingIn ? <Navigate to={`/dashboard`} /> : ""}
      </div>
    );
  }
}

export default Login;
