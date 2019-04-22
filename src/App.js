import React, { Component } from 'react';
import './App.css';
import { Lifecycle } from 'react-router'
import { Route } from 'react-router-dom'
import StarProducts from './pages/StarProducts'
import Homepage from "./pages/homepage"
import Bonus from "./pages/bonus"
import Details from "./pages/details"
import LachineProduct from "./pages/lachineProduct"
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'
import { SET_FOLIDAY_TOKEN, setFolidayToken, setUserInfo } from './actions';
import { Prius } from 'foliday-bridge'
import { getQueryVariable } from './utils/util'
import { account_current } from './pages/api/account'
window.Prius = Prius

@connect((state, props) => Object.assign({}, props, state), {
  setFolidayToken, setUserInfo
})
class App extends Component {
  constructor(...args) {
    super(...args)
  }

  async account_current() {
    let userInfo = await account_current()
    this.props.setUserInfo(userInfo)
  }

  // 检测是否登录有用户信息？
  async checkLogin() {
    let token = getQueryVariable('token')
    let folidayToken = this.props.user.folidayToken || localStorage.getItem(SET_FOLIDAY_TOKEN)
    if (!Object.keys(this.props.user.userInfo).length) {
      if (!folidayToken) {
        if (token) {
          this.props.setFolidayToken(token)
          await this.account_current()
          this.props.history.replace(this.props.location.pathname)
          return
        }
        window.location = `http://h5test.gofoliday.com/fyh/login?redirect=${window.location.href}`
      }
    }
  }

  componentDidUpdate() {
    this.checkLogin();
  }

  componentDidMount() {
    this.checkLogin();
    this.account_current()
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/starProducts" component={StarProducts} />
        <Route path="/bonus" component={Bonus} />
        <Route path="/details" component={Details} />
        <Route path="/lachineProduct" component={LachineProduct} />
        {/* <Route render={() => <NotFound />} /> */}
      </div>
    );
  }
}

export default App
