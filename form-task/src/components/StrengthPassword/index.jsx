import React, { Component } from "react";
import "./strengthPassword.css";

export default class StrengthPassword extends Component {
  render() {
    return (
      <div className={`strength ${this.props.strength}`}>
        <div className="strength_bar">
          <div className={`strength_bar_fill ${""}`}></div>
        </div>
        <p>
          {this.props.strength === "weak"
            ? "Weak! try to make it stronger"
            : this.props.strength === "medium"
            ? "Not bad but you know you can do it better"
            : this.props.strength === "strong"
            ? "strong"
            : ""}
        </p>
      </div>
    );
  }
}
