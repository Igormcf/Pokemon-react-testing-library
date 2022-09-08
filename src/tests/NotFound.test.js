import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o Component NotFound', () => {
  it('Testa se a página tem uma tag h2 com Page requested not found 😭', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFoundText).toBeInTheDocument();
  });
  it('Testa se a página mostra uma imagem', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because/i);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
