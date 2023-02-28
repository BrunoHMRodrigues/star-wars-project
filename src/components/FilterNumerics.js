import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import INITIAL_OPTIONS from '../helpers/initialOptions';

function FilterNumerics() {
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [columnValue, setColumnValue] = useState('0');

  const [columnOption, setColumnOptions] = useState(INITIAL_OPTIONS);
  const { searchFilterByComparison,
    setSearchFilterByComparison } = useContext(PlanetsContext);

  const handleFilterComparison = () => {
    if (column && operator && columnValue) {
      setSearchFilterByComparison(
        [...searchFilterByComparison, { column, operator, columnValue }],
      );
      setOperator('maior que');
      setColumnValue('0');
    }
  };

  const handleComparison = ({ target }) => {
    if (target.name === 'column') {
      setColumn(target.value);
    }
    if (target.name === 'operator') {
      setOperator(target.value);
    }
    if (target.name === 'columnValue') {
      setColumnValue(target.value);
    }
  };

  useEffect(() => {
    setColumnOptions(() => {
      const currentComparisonFilters = INITIAL_OPTIONS.reduce((acc, option) => {
        if (searchFilterByComparison.length > 0) {
          const filterShouldAdd = !(searchFilterByComparison
            .some((filter) => filter.column === option));
          if (filterShouldAdd) {
            acc.push(option);
          }
        } else {
          acc.push(option);
        }
        return acc;
      }, []);
      setColumn(currentComparisonFilters[0]);
      return currentComparisonFilters;
    });
  }, [searchFilterByComparison, setColumnOptions]);

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleComparison }
        value={ column }
      >
        {columnOption.map((option) => <option key={ option }>{option}</option>)}
      </select>

      <select
        name="operator"
        data-testid="comparison-filter"
        onChange={ handleComparison }
        value={ operator }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        name="columnValue"
        data-testid="value-filter"
        onChange={ handleComparison }
        value={ columnValue }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterComparison }
      >
        Filtrar
      </button>
    </div>
  );
}

export default FilterNumerics;
