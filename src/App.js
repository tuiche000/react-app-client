import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import { Prius } from 'foliday-bridge'
window.Prius = Prius

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/starProducts" component={StarProducts} />
        <Route path="/bonus" component={Bonus} />
        <Route path="/details" component={Details} />
        <Route path="/lachineProduct" component={LachineProduct} />
      </div>
    );
  }
}

export default App;
