import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders test topic', () => {
  it('App render', () => {
    render(<App />);
    const linkElement = screen.getByText(/2022 All right reversed/i);
    expect(linkElement).toBeInTheDocument();
  })
});
