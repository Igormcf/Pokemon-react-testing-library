import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonUrlId = '/pokemons/25';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se os detalhes do pokemon selecionado aparecem na tela', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByText(/Pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toHaveAttribute('href', pokemonUrlId);
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const pokemonTitle = screen.getByRole('heading',
      { name: /Pikachu Details/i });
    expect(pokemonTitle).toBeInTheDocument();
    expect(linkDetalhes).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();

    const resume = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(resume).toBeInTheDocument();
  });

  it('Testa se existe uma seção com mapas de localização na página', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByText(/Pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toHaveAttribute('href', pokemonUrlId);
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const localPokemon = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(localPokemon).toBeInTheDocument();

    const localOne = screen.getByText(/Kanto Viridian Forest/i);
    expect(localOne).toBeInTheDocument();
    const localTwo = screen.getByText(/Kanto Power Plant/i);
    expect(localTwo).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[1]).toBeInTheDocument();
    expect(images[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[2]).toBeInTheDocument();
  });

  it('Testa se é possível favoritar um pokemon na página de detalhes', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByText(/Pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toHaveAttribute('href', pokemonUrlId);
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const checkPokFavorite = screen.getByRole('checkbox',
      { name: /Pokémon favoritado?/i });
    expect(checkPokFavorite).toBeInTheDocument();
    userEvent.click(checkPokFavorite);

    const imgEstrela = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(imgEstrela).toHaveAttribute('src', '/star-icon.svg');
    expect(imgEstrela).toBeInTheDocument();

    userEvent.click(checkPokFavorite);
    expect(imgEstrela).not.toBeInTheDocument();
  });
});
