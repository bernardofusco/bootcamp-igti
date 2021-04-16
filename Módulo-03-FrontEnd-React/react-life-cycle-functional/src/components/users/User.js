import React from 'react';
import css from './User.module.css';

export default function User({ user }) {
  const { name, picture, email } = user;
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
