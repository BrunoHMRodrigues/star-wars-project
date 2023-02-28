const filterByComparison = (filteredArrayPlanets, searchFilterByComparison) => {
  let filteredNewArray = filteredArrayPlanets;
  for (let index = 0; index < searchFilterByComparison.length; index += 1) {
    const { column, operator, columnValue } = searchFilterByComparison[index];

    filteredNewArray = filteredNewArray.filter((planet) => {
      const condition = (
        ((operator === 'maior que' && (Number(planet[column]) > Number(columnValue)))
        || (operator === 'menor que' && (Number(planet[column]) < Number(columnValue)))
        || (operator === 'igual a' && (Number(planet[column]) === Number(columnValue))))
      );
      return condition;
    });
  }
  return filteredNewArray;
};

export default filterByComparison;
