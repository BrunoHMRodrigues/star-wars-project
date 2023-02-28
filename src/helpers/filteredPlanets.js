import filterByName from './filterByName';
import filterByComparison from './filterByComparison';

const filteredPlanets = (planets, searchFilterByName, searchFilterByComparison) => {
  let filteredArrayPlanets = planets;
  if (searchFilterByName) {
    filteredArrayPlanets = filterByName(planets, searchFilterByName);
  }
  if (searchFilterByComparison.length > 0) {
    filteredArrayPlanets = filterByComparison(
      filteredArrayPlanets,
      searchFilterByComparison,
    );
  }
  return filteredArrayPlanets;
};

export default filteredPlanets;
