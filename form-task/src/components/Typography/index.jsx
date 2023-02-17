import React, { Component } from "react";

export class H1 extends Component {
  render() {
    return <h1>{this.props.text}</h1>;
  }
}
export class H2 extends Component {
  render() {
    return <h2>{this.props.text}</h2>;
  }
}

export class Body extends Component {
  render() {
    return <p className="typography_p">{this.props.text}</p>;
  }
}

export class Label extends Component {
  render() {
    return <label>{this.props.text}</label>;
  }
}
