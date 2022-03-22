import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o component App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link',
      { name: /Home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link',
      { name: /About/i });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link',
      { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Teste se ao cliclar no link Home é direcionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se ao cliclar no link About é direcionado para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste o link Favorite pokemons direciona para a página de pokemóns', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se uma URL desconhecida direciona para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-nao-encontrada');

    const pagNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(pagNotFound).toBeInTheDocument();
  });
});
