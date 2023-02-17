import React, { Component } from "react";
import { Label } from "../Typography";
import './input.css';

export default class Input extends Component {
  render() {
    const { label, value, id, type, placeholder, returnValue } = this.props;
    return (
      <div className="input_box">
        <Label text={label} />
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={returnValue}
        />
      </div>
    );
  }
}
