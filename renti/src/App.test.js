import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {createMemoryHistory} from 'history'
import '@testing-library/jest-dom/extend-expect'
import App from './App';
import Marketplace from './Marketplace';
import {Router} from 'react-router-dom'
import Favourites from "./Favourites";
import fetchMock from "fetch-mock";
import CreateRental from "./CreateRental";
import MyRentals from "./MyRentals";
import RentalRequests from "./RentalRequests";

//Start using mocks as in this template: testing-library.com/docs/react-testing-library

//Mock user Storage
localStorage.setItem('userID', 1);

test('Render renti marketplace', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/Renti Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});


test('Render footer', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/Renti 2020/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Remember me', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/Remember me/i);
  expect(linkElement).toBeInTheDocument();
});

//other screens testing
test('Render Search Bar', () => {
  const {getByText} = render(<Marketplace/>);
  const linkElement = getByText(/Rent anything!/i);
  expect(linkElement).toBeInTheDocument();
});

test('Login goes to Sign Up', () => {
  const history = createMemoryHistory()
  history.push('/login')
  const {getByText} = render(
    <Router history={history}>
      <App/>
    </Router>
  );

  const linkElement = getByText(/Don't have an account\? Sign Up/i);
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);

  const newElement = getByText(/Already have an account\? Sign in/i);

  expect(newElement).toBeInTheDocument();

});

test('Render Favourites', () => {
  const {getByText} = render(
    <Favourites/>,
  );

  expect(getByText(/Favourites/i)).toBeInTheDocument();
});

test('Render Create Rental', () => {
  const {getByText} = render(
    <CreateRental/>,
  );

  expect(getByText(/Create a Rental/i)).toBeInTheDocument();
});

test('Routing rentals', () => {
  // localStorage.setItem('userID', 1);
  const history = createMemoryHistory()
  history.push('/my_rentals')
  const {container, getByText} = render(
    <Router history={history}>
      <MyRentals/>
      <RentalRequests/>
    </Router>
  );

  const linkElement = getByText(/Rental Requests/i);
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);

  const newElement = getByText(/Go back to rentals/i);
  expect(newElement).toBeInTheDocument();
});
