import React from 'react';
import './App.css';
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Marketplace from "./Marketplace";
import SignUp from "./SignUp";
import ProductPage from "./ProductPage";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Router>
        <main>
          <Route path="/" exact component={Marketplace}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/register" component={SignUp}/>
          <Route path="/product/:id" component={ProductPage}/>
        </main>
      </Router>
    </div>
  );
}

export default App;
