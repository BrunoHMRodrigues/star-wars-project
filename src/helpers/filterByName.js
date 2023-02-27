const filterByName = (planets, searchFilterByName) => planets
  .filter((planet) => planet.name.toLowerCase()
    .includes(searchFilterByName.toLowerCase()));

export default filterByName;
