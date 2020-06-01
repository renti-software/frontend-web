import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Marketplace from "./Marketplace";
import Favourites from "./Favourites";
import SignUp from "./SignUp";
import ProductPage from "./ProductPage";
import CreateRental from "./CreateRental";
import MyRentals from "./MyRentals";
import RentalRequests from "./RentalRequests";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <main>
          <Route path="/" exact component={SignIn}/>
          <Route path="/marketplace" exact component={Marketplace}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/sign_up" component={SignUp}/>
          <Route path="/create" component={CreateRental}/>
          <Route path="/favourites" component={Favourites}/>
          <Route path="/register" component={SignUp}/>
          <Route path="/product/:id" component={ProductPage}/>
          <Route path="/my_rentals" component={MyRentals}/>
          <Route path="/rental_requests" component={RentalRequests}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
