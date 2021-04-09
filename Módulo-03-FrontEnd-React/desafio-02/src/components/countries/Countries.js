import React, { Component } from 'react';
import Country from './Country.js';
import css from './countries.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;
    return (
      <div className={`${css.border} ${css.flexBox}`}>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />;
        })}
      </div>
    );
  }
}
