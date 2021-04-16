import React from 'react';
import css from './country.module.css';

export default function Country({ country }) {
  return (
    <div className={`${css.border} ${css.flexBox}`}>
      <img className={css.flag} src={country.flag} alt={country.name} />
      <span className={css.coutryName}>{country.name}</span>
    </div>
  );
}
