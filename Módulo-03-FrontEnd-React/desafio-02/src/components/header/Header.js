import React, { Component } from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          type="text"
          placeholder="Pesquise o país..."
          value={filter}
          onChange={this.handleInputChange}
        />
        <span className={css.countries}>
          | Total de países: <strong>{countryCount}</strong>
        </span>{' '}
        |{' '}
        <span className={css.population}>
          População total: <strong>{formatNumber(totalPopulation)}</strong>
        </span>
      </div>
    );
  }
}
