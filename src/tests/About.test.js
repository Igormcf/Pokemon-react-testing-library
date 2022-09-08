import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testa o component About', () => {
  it('Testa se a página contém uma tag h2 com About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading',
      { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);

    const paragOne = screen.getByText(/This application/i);
    expect(paragOne).toBeInTheDocument();

    const paragTwo = screen.getByText(/One can filter/i);
    expect(paragTwo).toBeInTheDocument();
  });

  it('Testa se a página tem a imagem de uma pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByAltText(/Pokédex/i);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
