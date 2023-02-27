const fetchPlanets = async () => {
  const END_POINT = 'https://swapi.dev/api/planets';
  const response = await fetch(END_POINT);
  const result = await response.json();
  return result.results;
};

export default fetchPlanets;
