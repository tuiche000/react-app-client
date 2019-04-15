import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import List from './pages/List'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact component={List} />
        <Route path="/list" component={List} />
      </div>
    );
  }
}

export default App;
