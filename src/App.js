import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import FilterNumerics from './components/FilterNumerics';
import Table from './components/Table';

function App() {
  return (
    <div>
      <FilterName />
      <FilterNumerics />
      <Table />
    </div>
  );
}

export default App;
