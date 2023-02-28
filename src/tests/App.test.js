import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

describe('Verify if the page is rendering the elements as intended', () => {
  it('Verifying the inputbox', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
  })
  it('Verifying the comparison', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const selectColumn = screen.getByTestId('column-filter');
    expect(selectColumn).toBeInTheDocument();
    expect(selectColumn).toHaveLength(5);
    expect(selectColumn).toHaveValue('population')
    const selectOperator = screen.getByTestId('comparison-filter');
    expect(selectOperator).toBeInTheDocument()
    expect(selectOperator).toHaveLength(3)
    expect(selectOperator).toHaveValue('maior que')
    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument()
    expect(inputValue).toHaveValue('0')
    const btnFilter = screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument()
  })
  it('Verifying the sort', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const selectColumnSort = screen.getByTestId('column-sort');
    expect(selectColumnSort).toBeInTheDocument();
    expect(selectColumnSort).toHaveValue('population');
    const inputAsc = screen.getByRole('radio', {name: /ascendente/i});
    expect(inputAsc).toBeInTheDocument();
    expect(inputAsc).not.toBeChecked();
    const inputDesc = screen.getByRole('radio', {name: /descendente/i});
    expect(inputDesc).toBeInTheDocument();
    expect(inputDesc).not.toBeChecked();
    const btnSort = screen.getByRole('button', {name: /ordenar/i});
    expect(btnSort).toBeDisabled();
    
  })
  it('Verifying the table', () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    const allColumnHeaders = screen.getAllByRole('columnheader')
    expect(allColumnHeaders).toHaveLength(13);
  })
});

describe('Verify if the page filters are working as intended', () => {
  it('Verify if Filter by text is working', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    })
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    })
    const getOnePlanet = await screen.findByText('Tatooine');
    expect(getOnePlanet).toBeInTheDocument();
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
    userEvent.type(inputSearch, 'H')
    const arrayFiltered = screen.getAllByTestId('planet-name')
    expect(arrayFiltered).toHaveLength(2)
    const hothPlanet = await screen.findByText('Hoth')
    expect(hothPlanet).toBeInTheDocument();
    const DagobahPlanet = await screen.findByText('Dagobah')
    expect(DagobahPlanet).toBeInTheDocument();
    userEvent.type(inputSearch, 'o')
    expect(hothPlanet).toBeInTheDocument();
    expect(DagobahPlanet).not.toBeInTheDocument();
  })
  it('Verify if Filter by comparison is working', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    })
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    })
    const selectColumn = screen.getByTestId('column-filter');
    const selectOperator = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    inputValue.setSelectionRange(0, inputValue.value.length);
    userEvent.type(inputValue, '100000000');
    expect(inputValue).toHaveValue('100000000');
    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);
    const arrayFilteredPopulation = screen.getAllByTestId('planet-name');
    expect(arrayFilteredPopulation).toHaveLength(4);
    expect(selectColumn).toHaveLength(4);
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectOperator, 'menor que');
    inputValue.setSelectionRange(0, inputValue.value.length);
    userEvent.type(inputValue, '13000');
    expect(inputValue).toHaveValue('13000');
    userEvent.click(btnFilter);
    const arrayFilteredDiameter = screen.getAllByTestId('planet-name');
    expect(arrayFilteredDiameter).toHaveLength(3);
    const arrayFiltersSelected = screen.getAllByTestId('filter');
    expect(arrayFiltersSelected).toHaveLength(2)
    expect(selectColumn).toHaveValue('orbital_period');
    userEvent.selectOptions(selectOperator, 'igual a');
    userEvent.type(inputValue, '364');
    userEvent.click(btnFilter);
    const arrayFilteredOrbital = screen.getAllByTestId('planet-name');
    expect(arrayFilteredOrbital).toHaveLength(1);
    const buttonsRemoveFilter = screen.getAllByRole('button', {name:'X'});
    expect(buttonsRemoveFilter).toHaveLength(3);
    userEvent.click(buttonsRemoveFilter[0]);
    const newButtonsRemoveFilter = screen.getAllByRole('button', {name:'X'});
    expect(newButtonsRemoveFilter).toHaveLength(2);
    expect(selectColumn).toHaveLength(3)
    const btnRemoveFilters = screen.getByRole('button', {name: 'Remover Filtros'});
    userEvent.click(btnRemoveFilters);
    const filterSelected = screen.queryAllByTestId('filter')
    expect(filterSelected).toHaveLength(0);
  })
})

describe('Verify if the page sort is working as intended', () => {
  it('Verify if sort is working', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    })
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    })
    const selectColumnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(selectColumnSort, 'diameter');
    const inputAsc = screen.getByRole('radio', {name: /ascendente/i});
    const inputDesc = screen.getByRole('radio', {name: /descendente/i});
    const btnSort = screen.getByTestId('column-sort-button');
    userEvent.click(inputDesc);
    expect(btnSort).not.toBeDisabled();
    userEvent.click(btnSort);

    const arraySortedDiameterDesc = screen.getAllByTestId('planet-name');
    console.log(arraySortedDiameterDesc);
    expect(arraySortedDiameterDesc[0]).toHaveTextContent('Bespin')
    expect(arraySortedDiameterDesc[1]).toHaveTextContent('Kamino')

    userEvent.selectOptions(selectColumnSort, 'population');
    userEvent.click(inputAsc);
    userEvent.click(btnSort);
    const arraySortedPopulatioAsc = screen.getAllByTestId('planet-name');
    expect(arraySortedPopulatioAsc[0]).toHaveTextContent('Yavin IV')
    expect(arraySortedPopulatioAsc[1]).toHaveTextContent('Tatooine')
    
  })
})
