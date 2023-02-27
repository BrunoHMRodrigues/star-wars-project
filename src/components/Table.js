import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import TablePlanetEntry from './TablePlanetEntry';

function Table() {
  const { planets } = useContext(PlanetsContext);
  return (
    <table>
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
        {planets.length > 0 && planets.map((planet) => (
          <TablePlanetEntry key={ planet.name } planet={ planet } />
        ))}
      </tbody>
    </table>
  );
}

export default Table;