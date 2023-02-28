import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../helpers/fetchPlanets';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchFilterByName, setSearchFilterByName] = useState('');
  const [searchFilterByComparison, setSearchFilterByComparison] = useState([]);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    searchFilterByName,
    setSearchFilterByName,
    searchFilterByComparison,
    setSearchFilterByComparison,
  }), [planets, searchFilterByName, searchFilterByComparison]);

  useEffect(() => {
    console.log(planets, 'atualizou');
  }, [planets]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPlanets();
      for (let index = 0; index < data.length; index += 1) {
        delete data[index].residents;
      }
      setPlanets(data);
    };
    fetchData();
  }, []);
  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
