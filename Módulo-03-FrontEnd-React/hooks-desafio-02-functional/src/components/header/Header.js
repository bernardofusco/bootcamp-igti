import React from 'react';
import { formatNumber } from '../../helpers/formatHelpers';
import css from './header.module.css';

export default function Header({
  onChangeFilter,
  filter,
  countryCount,
  totalPopulation,
}) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  return (
    <div className={css.flexRow}>
      <input
        type="text"
        placeholder="Pesquise o país..."
        value={filter}
        onChange={handleInputChange}
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
