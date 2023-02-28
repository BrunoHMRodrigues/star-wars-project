import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import planets from './data';

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
    expect(selectColumn).toHaveValue('population')
    const selectOperator = screen.getByTestId('comparison-filter');
    expect(selectOperator).toBeInTheDocument()
    expect(selectOperator).toHaveValue('maior que')
    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument()
    expect(inputValue).toHaveValue('0')
    const btnFilter = screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument()
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

describe('Verify if the pages functionalities are working as intended', () => {
  it('Verify if Filter by text is working', async () => {
    jest.resetAllMocks();
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(planets),
    })
    await act(async () => {
      render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      );
    })
    // waitFor(() => {
    //   const getOnePlanet = screen.findByText('Tatooine');
    //   expect(getOnePlanet).toBeInTheDocument();
    // }, 10000)
    const getOnePlanet = await screen.findByText('Tatooine');
    expect(getOnePlanet).toBeInTheDocument();
    const inputSearch = screen.getByTestId('name-filter');
    expect(inputSearch).toBeInTheDocument();
  })
})
