import filterByName from './filterByName';

const filteredPlanets = (planets, searchFilterByName) => {
  let filteredArrayPlanets = planets;
  if (searchFilterByName) {
    filteredArrayPlanets = filterByName(planets, searchFilterByName);
  }
  return filteredArrayPlanets;
};

export default filteredPlanets;
