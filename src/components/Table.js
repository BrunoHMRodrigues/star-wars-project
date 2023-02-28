import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import filteredPlanets from '../helpers/filteredPlanets';
import TablePlanetEntry from './TablePlanetEntry';

function Table() {
  const {
    planets,
    searchFilterByName,
    searchFilterByComparison,
    tableUpdate } = useContext(PlanetsContext); // rever necessidade tableUpdate

  return (
  // rever necessidade tableUpdate
    <table key={ tableUpdate }>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {planets.length > 0 && (
          filteredPlanets(planets, searchFilterByName, searchFilterByComparison)
            .map((planet) => (
              <TablePlanetEntry key={ planet.name } planet={ planet } />
            ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
