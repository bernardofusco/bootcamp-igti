import React from 'react';
import Country from './Country.js';
import css from './countries.module.css';

export default function Countries({ countries }) {
  return (
    <div className={`${css.border} ${css.flexBox}`}>
      {countries.map((country) => {
        return <Country key={country.id} country={country} />;
      })}
    </div>
  );
}
