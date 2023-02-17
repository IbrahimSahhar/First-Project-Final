import React, { Component } from "react";
import "./signup.css";

import Logo from "../../assets/images/logolight.png";
import PointsImg from "../../assets/images/points.svg";
import Corner from "../../assets/images/corner.png";
import Arrow from "../../assets/images/backarrow.svg";
import GoogleIcon from "../../assets/images/googleIcon.svg";

import BoxWithBgImg from "../../components/BoxWithBgImg";
import Container from "../../components/container";
import { Body, H2 } from "../../components/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import OrLine from "../../components/OrLine";
import StrengthPassword from "../../components/StrengthPassword";

import { Link, Navigate, NavLink } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import ScrollToTop from "../../components/ScrollToTop";
import Card from "../../components/Card";

export default class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    agree: true,
    strength: "nothing",
    isAuth: false,
    error: false,
    messageOfError: "",
    classnames: "",
    styleOfCard: {
      top: "-100%",
    },
  };
  // create schema for yup validation
  schema = yup.object().shape({
    email: yup
      .string()
      .email("the email is not correct")
      .required("email input is required"),
    password: yup
      .string()
      .required("password input is required")
      .min(8, "your password should be at least 8 characters")
      .max(30, "your password should be at most 30 characters")
      .matches('^[a-zA-Z0-9!@#$&()-`.+,/"]*$'),
    password2: yup
      .string()
      .required("repeat password input is required")
      .min(8, "your password should be at least 8 characters")
      .max(30, "your password should be at most 30 characters")
      .matches('^[a-zA-Z0-9!@#$&()-`.+,/"]*$')
      .oneOf([yup.ref("password")], "please make sure that passwords matches!"),
    agree: yup
      .boolean()
      .required("check input is required")
      .isTrue("Must Agree From Conditions"),
  });

  componentDidMount() {
    window.scrollY = 0;
    const user = JSON.parse(localStorage.getItem("gamerUser"));
    if (user) {
      this.setState({ isAuth: true });
    }
  }

  returnValue = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });

    if (id === "password" && value !== "") {
      this.handelStrength(value);
    } else {
      this.setState({
        strength: "nothing",
      });
    }
  };

  handelCheckbox = (e) => {
    const { checked } = e.target;
    this.setState({ agree: checked });
  };

  handelStrength = (password) => {
    let capitals = /[A-Z]/,
      smalls = /[a-z]/,
      nums = /[0-9]/;
    if (password.length < 8) {
      return this.setState({ strength: "weak" });
    } else if (
      smalls.test(password) &&
      nums.test(password) &&
      capitals.test(password)
    ) {
      this.setState({
        strength: "strong",
      });
    } else if (smalls.test(password) && nums.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password) && nums.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password) && smalls.test(password)) {
      this.setState({
        strength: "medium",
      });
    } else if (capitals.test(password)) {
      this.setState({
        strength: "weak",
      });
    } else if (smalls.test(password)) {
      this.setState({
        strength: "weak",
      });
    } else if (nums.test(password)) {
      this.setState({
        strength: "weak",
      });
    }
  };

  sendData = (e) => {
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

    this.schema
      .validate(
        {
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          agree: this.state.agree,
        },
        { abortEarly: false }
      )
      .then(async () => {
        try {
          const res = await axios.post(
            `https://react-tt-api.onrender.com/api/users/signup`,
            {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
            }
          );
          localStorage.setItem("gamerUser", JSON.stringify(res.data));
          this.setState({
            error: false,
            messageOfError: "successfully!",
            isAuth: true,
          });
        } catch (err) {
          console.log(err);
        } finally {
        }
      })
      .catch((err) => {
        this.setState({
          error: true,
          messageOfError: `You have ${err.errors.length} errors 
              : ${err.errors[0]}`,
        });
      });
  };
  // function to scale the card from the page
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
      <div className="signup_page">
        <BoxWithBgImg>
          <img src={Logo} alt="logo" />
          <img src={PointsImg} alt="points group" className="points_img" />
          <p className="quts_mark">“</p>
          <p className="quts_text">
            I always observe the people who pass by when I ride an escalator.
            I'll never see most of them again, so I imagine a lot of things
            about their lives... about the day ahead of them.
          </p>
          <h5 className="author">Hideo Kojima</h5>
          <div className="corner_container">
            <img src={Corner} alt="corner" />
          </div>
        </BoxWithBgImg>

        <div className="content_box">
          <Link to="/login" className="back_btn">
            <button>
              <img src={Arrow} alt="arrow" /> Back
            </button>
          </Link>
          <Container>
            <H2 text="Register Individual Account!" />
            <Body text="For the purpose of gamers regulation, your details are required." />
            <hr style={{ border: "1px solid #F5F5F5", margin: "16px 0" }} />
            <form onSubmit={this.sendData}>
              <Input
                label="Name*"
                value={this.state.name}
                id="name"
                type="text"
                placeholder="Enter your name"
                returnValue={this.returnValue}
              />
              <Input
                label="Email address*"
                value={this.state.email}
                id="email"
                type="email"
                placeholder="Enter email address"
                returnValue={this.returnValue}
              />
              <Input
                label="Create password*"
                value={this.state.password}
                id="password"
                type="password"
                placeholder="Password"
                returnValue={this.returnValue}
              />
              <StrengthPassword strength={this.state.strength} />
              <Input
                label="Repeat password*"
                value={this.state.password2}
                id="password2"
                type="password"
                placeholder="Repeat password"
                returnValue={this.returnValue}
              />
              <div className="checkbox_container">
                <input
                  type="checkbox"
                  id="agree"
                  value={this.state.agree}
                  name="agree"
                  checked={this.state.agree}
                  onChange={this.handelCheckbox}
                />
                <label htmlFor="agree" className="agree_label">
                  I agree to terms & conditions
                </label>
              </div>
              <Button
                text="Register Account"
                classes="btn btn-primary"
                type="submit"
              />
              <OrLine />
              <button className="btn shadow">
                <img className="icon" src={GoogleIcon} alt="icon" />
                <ScrollToTop>
                  <NavLink style={{ color: "black" }} to="/Login">
                    Login
                  </NavLink>
                </ScrollToTop>
              </button>
            </form>
          </Container>
        </div>
        <Card
          Classes={this.state.classnames}
          Method={this.scale}
          ErrorMassage={this.state.messageOfError}
          Type={this.state.error}
          Style={this.state.styleOfCard}
          Href="/login"
        />
        {this.state.isAuth ? <Navigate to="/dashboard" /> : ""}
      </div>
    );
  }
}
