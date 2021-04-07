import React, { Component } from 'react';
import css from './User.module.css';

export default class User extends Component {
  render() {
    const { login, name, picture, email } = this.props.user;
    return (
      <div className={css.flexRow}>
        <img className={css.avatar} src={picture.large} alt={name.first} />
        <span>
          {name.first} {name.last}
        </span>
        <p>- email: {email}</p>
      </div>
    );
  }
}
