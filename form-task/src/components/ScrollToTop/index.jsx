import React, { Component } from "react";

export default class ScrollToTop extends Component {
  scroll = () => {
    window.scrollTo({
      top: 0,
    });
  };
  render({ children } = this.props) {
    return (
      <div className="scroll" onClick={this.scroll}>
        {children}
      </div>
    );
  }
}
