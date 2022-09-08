import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado o card do pokemon com suas informações', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByText(/Pikachu/i);
    const tipoPokemon = screen.getByTestId('pokemon-type');
    const pesoPokemon = screen.getByText(/Average weight: 6.0 kg/i);
    const imgPokemon = screen.getByAltText(/Pikachu sprite/i);

    expect(nomePokemon).toBeInTheDocument();
    expect(tipoPokemon).toBeInTheDocument();
    expect(tipoPokemon.textContent).toBe('Electric');
    expect(pesoPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card tem um link para exibir detalhes do pokemon', () => {
    renderWithRouter(<App />);

    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toHaveAttribute('href', '/pokemons/25');
    expect(linkDetalhes).toBeInTheDocument();
  });

  it('Testa se o link More details direciona para a página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const detailsTitle = screen.getByRole('heading',
      { name: /Pikachu Details/i, level: 2 });
    expect(detailsTitle).toBeInTheDocument();
  });

  it('Testa se a URL da página de detalhes contém o id do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela no pokemon favoritado', () => {
    renderWithRouter(<App />);

    const nomePokemon = screen.getByText(/Pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
    const linkDetalhes = screen.getByRole('link', { name: /More details/i });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const checkPokFavorite = screen.getByRole('checkbox',
      { name: /Pokémon favoritado?/i });
    expect(checkPokFavorite).toBeInTheDocument();
    userEvent.click(checkPokFavorite);

    const imgEstrela = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(imgEstrela).toHaveAttribute('src', '/star-icon.svg');
    expect(imgEstrela).toBeInTheDocument();
  });
});
