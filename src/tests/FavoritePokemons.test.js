import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o component FavoritePokemons', () => {
  it('Testa se exibe No favorite pokemon found caso não tenha favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const favorText = screen.getByText(/No favorite pokemon found/i);
    expect(favorText).toBeInTheDocument();
  });

  it('Testa se exibe todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pokeFav = screen.getByRole('checkbox',
      { name: /Pokémon favoritado?/i });
    expect(pokeFav).toBeInTheDocument();
    userEvent.click(pokeFav);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const cards = screen.getByText(/Average weight/i);
    expect(cards).toBeInTheDocument();
  });
});
