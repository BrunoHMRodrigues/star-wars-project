import React from 'react';
import './App.css';
import ButtonRemoveAllFilters from './components/ButtonRemoveAllFilters';
import ComparisonFiltersSelected from './components/ComparisonFiltersSelected';
import FilterName from './components/FilterName';
import FilterNumerics from './components/FilterNumerics';
import OrderTable from './components/OrderTable';
import Table from './components/Table';

function App() {
  return (
    <div>
      <div className="container-name-filter">
        <FilterName />
      </div>
      <div className="container-filters">
        <FilterNumerics />
        <ButtonRemoveAllFilters />
        <OrderTable />
      </div>
      <ComparisonFiltersSelected />
      <Table />
    </div>
  );
}

export default App;
