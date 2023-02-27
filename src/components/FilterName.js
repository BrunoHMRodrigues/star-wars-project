import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterName() {
  const { setSearchFilterByName } = useContext(PlanetsContext);
  const handleFilter = ({ target }) => {
    setSearchFilterByName(target.value);
  };
  return (
    <input
      onChange={ handleFilter }
      placeholder="Informe o planeta a ser procurado"
      data-testid="name-filter"
    />
  );
}

export default FilterName;
