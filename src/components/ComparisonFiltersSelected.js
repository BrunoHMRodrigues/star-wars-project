import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './ComparisonFiltersSelected.css';

function ComparisonFiltersSelected() {
  const {
    searchFilterByComparison,
    setSearchFilterByComparison } = useContext(PlanetsContext);
  const handleRemoveComparison = ({ target }) => {
    const newFilters = [];
    for (let index = 0; index < searchFilterByComparison.length; index += 1) {
      if (searchFilterByComparison[index].column !== target.id) {
        newFilters.push(searchFilterByComparison[index]);
      }
    }
    setSearchFilterByComparison(newFilters);
  };
  return (
    <div className="container-filters-comparison">
      {searchFilterByComparison.map((comparison) => {
        const concatComparison = `${comparison.column} 
        ${comparison.operator} ${comparison.columnValue}`;
        return (
          <div
            key={ concatComparison }
            className="container-filter-comparison"
            data-testid="filter"
          >
            <p>{concatComparison}</p>
            <button
              id={ comparison.column }
              type="button"
              onClick={ handleRemoveComparison }
            >
              X

            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ComparisonFiltersSelected;
