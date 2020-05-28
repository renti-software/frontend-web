import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Marketplace from "./Marketplace";
import SignUp from "./SignUp";
import CreateRental from "./CreateRental";
import MyRentals from "./MyRentals";


function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <main>
          <Route path="/" exact component={Marketplace}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/create" component={CreateRental}/>
          <Route path="/register" component={SignUp}/>
          <Route path="/my_rentals" component={MyRentals}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
