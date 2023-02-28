import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './ComparisonFiltersSelected.css';

function ButtonRemoveAllFilters() {
  const { setSearchFilterByComparison } = useContext(PlanetsContext);
  const handleRemoveAllFilters = () => {
    setSearchFilterByComparison([]);
  };
  return (
    <button
      type="button"
      data-testid="button-remove-filters"
      onClick={ handleRemoveAllFilters }
    >
      Remover Filtros
    </button>

  );
}

export default ButtonRemoveAllFilters;
