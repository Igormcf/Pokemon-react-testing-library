import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component Pokedex', () => {
  it('Testa se contém h2 com Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Testa a exibição do próximo pokemon quando clica no botão Próximo pokémon', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();

    const pokemonId = screen.getByTestId('pokemon-name');
    pokemons.forEach(({ name }, index) => {
      if (index === pokemons.length - 1) {
        expect(pokemonId.textContent).toBe(name);
        userEvent.click(btnNext);
        expect(pokemonId.textContent).toBe('Pikachu');
      } else {
        expect(pokemonId.textContent).toBe(name);
        userEvent.click(btnNext);
      }
    });
  });
  it('Testa se é mostrado um pokemon por vez', () => {
    renderWithRouter(<App />);

    const numPokemon = screen.getAllByText(/Average weight/i);
    expect(numPokemon.length).toBe(1);
  });

  it('Testa os botões de filtro', () => {
    renderWithRouter(<App />);

    const idBtn = screen.getAllByTestId('pokemon-type-button');
    idBtn.forEach((item) => {
      userEvent.click(item);
      const idTypePokemons = screen.getByTestId('pokemon-type');
      expect(item.textContent).toBe(idTypePokemons.textContent);
      expect(idBtn[0]).toBeInTheDocument();
    });
  });

  it('Testa se a pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);

    const pokemonPikachu = screen.getByText(/Pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
  });
});
