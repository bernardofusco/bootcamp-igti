import React from 'react';

export default function DecrementButton(props) {
  const onDecrement = props;
  const handleButtonClick = () => {
    onDecrement('-');
  };

  return (
    <button
      onClick={this.handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}
