import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Render renti marketplace', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Renti Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});
