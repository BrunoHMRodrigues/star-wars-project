import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import INITIAL_OPTIONS from '../helpers/initialOptions';

function OrderTable() {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const [columnToOrder, setColumnToOrder] = useState(INITIAL_OPTIONS[0]);
  const [orderRule, setOrderRule] = useState('');
  const { setTableUpdate } = useContext(PlanetsContext); // rever necessidade tableUpdate

  const handleColumn = ({ target }) => {
    setColumnToOrder(target.value);
  };

  const handleRuleChange = ({ target }) => {
    setOrderRule(target.value);
  };

  function compareValues(a, b) {
    if (orderRule === 'ASC') {
      return Number(a[columnToOrder]) - Number(b[columnToOrder]);
    }
    return Number(b) - Number(a);
  }

  const handleOrderTable = () => {
    const arrayPlanets = planets;
    const orderedPlanets = arrayPlanets.sort((a, b) => compareValues(a, b));
    console.log(orderedPlanets);
    setPlanets(orderedPlanets);
    setTableUpdate(true); // rever necessidade tableUpdate
  };

  return (
    <div>
      <select data-testid="column-sort" onChange={ handleColumn }>
        {INITIAL_OPTIONS
          .map((option) => <option key={ `order${option}` }>{option}</option>)}
      </select>

      <input
        type="radio"
        id="rule-asc"
        data-testid="column-sort-input-asc"
        value="ASC"
        name="rule-order"
        onChange={ handleRuleChange }
      />
      <label htmlFor="rule-asc">Ascendente</label>

      <input
        type="radio"
        id="rule-desc"
        data-testid="column-sort-input-desc"
        value="DESC"
        name="rule-order"
        onChange={ handleRuleChange }
      />
      <label htmlFor="rule-desc">Descendente</label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrderTable }
        disabled={ (!columnToOrder || orderRule === '') }
      >
        Ordenar
      </button>
    </div>
  );
}

export default OrderTable;
