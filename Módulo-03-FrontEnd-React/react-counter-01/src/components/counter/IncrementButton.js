import React, { Component } from 'react';

export default class incrementButton extends Component {
  handleButtonClick = () => {
    this.props.onIncrement('+');
  };

  render() {
    return (
      <button
        onClick={this.handleButtonClick}
        className="waves-effect waves-light btn green darken-4"
      >
        +
      </button>
    );
  }
}
