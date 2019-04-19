import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import { connect } from 'react-redux'
import { setFolidayToken } from './actions';
import { Prius } from 'foliday-bridge'
import { getQueryVariable } from './utils/util'
window.Prius = Prius

class App extends Component {
  // constructor(...args) {
  //   super(...args)
  // }

  checkLogin() {
    console.log(this.props)
    let token = getQueryVariable('token')
    if (token) {
      this.setFolidayToken(token)
      return
    }
    if (!Object.keys(this.props.user.userInfo).length) {
      // http://localhost:3000/?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE1MjE2NzA3NjI3IiwiY3JlYXRlZCI6MTU1NTQwNzY1OTc3MiwiZXhwIjoxNTg2OTQzNjU5fQ.tgnPlIoZFsVlZmfhtQU8VhcvZ7K-sP8CqmjSoeGfHbkAksMAFPxW2OyJxsGw36NmgMfmfmbYHXSnppWFAWBIXg
      window.location=`http://h5test.gofoliday.com/fyh/login?redirect=${window.location.href}`
    }
  }

  componentDidUpdate() {
    // this.checkLogin();
  }

  componentDidMount() {
    // this.checkLogin();
  }

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

export default connect((state, props) => Object.assign({}, props, state), {
  setFolidayToken
})(App);
