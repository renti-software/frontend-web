import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Marketplace from './Marketplace';
import { useHistory } from 'react-router-dom';

//Start using mocks as in this template: testing-library.com/docs/react-testing-library

//Mock user Storage
localStorage.setItem('userID',1)

test('Render renti marketplace', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Renti Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render footer', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Renti 2020/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Remember me', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Remember me/i);
  expect(linkElement).toBeInTheDocument();
});

//other screens testing
test('Render Search Bar', () => {
  const { getByText } = render(<Marketplace />);
  const linkElement = getByText(/Rent anything!/i);
  expect(linkElement).toBeInTheDocument();
});