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
import { SET_FOLIDAY_TOKEN } from './actions';
window.Prius = Prius

class App extends Component {
  // constructor(...args) {
  //   super(...args)
  // }

  checkLogin() {
    let token = getQueryVariable('token')
    let folidayToken = this.props.user.folidayToken || localStorage.getItem(SET_FOLIDAY_TOKEN)
    // if (!Object.keys(this.props.user.userInfo).length) {
    if (!folidayToken) {
      // http://localhost:3000/?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb3N1biIsIm1lbSI6IjE1MjE2NzA3NjI3IiwiY3JlYXRlZCI6MTU1NTQwNzY1OTc3MiwiZXhwIjoxNTg2OTQzNjU5fQ.tgnPlIoZFsVlZmfhtQU8VhcvZ7K-sP8CqmjSoeGfHbkAksMAFPxW2OyJxsGw36NmgMfmfmbYHXSnppWFAWBIXg
      if (token) {
        this.props.setFolidayToken(token)
        this.props.history.replace(this.props.location.pathname)
        return
      }
      window.location = `http://h5test.gofoliday.com/fyh/login?redirect=${window.location.href}`
    }
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/starProducts" component={StarProducts} />
        <Route path="/bonus" component={Bonus} />
        <Route path="/details" component={Details} />
        <Route path="/lachineProduct" component={LachineProduct} />
        {/* <Route render={} /> */}
      </div>
    );
  }
}

export default connect((state, props) => Object.assign({}, props, state), {
  setFolidayToken
})(App);
