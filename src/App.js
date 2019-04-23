import React, { Component } from 'react';
import './App.css';
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
    // 是否有用户信息
    if (!Object.keys(this.props.user.userInfo).length) {
      let token = getQueryVariable('token')
      let folidayToken = this.props.user.folidayToken || localStorage.getItem(SET_FOLIDAY_TOKEN)
      // 是否有token或者storeage的token
      if (!folidayToken) {
        // 有token就存token并且存用户信息
        if (token) {
          this.props.setFolidayToken(token)
          await this.account_current()
          this.props.history.replace(this.props.location.pathname)
          return
        }
        // 啥都没有就滚去登录页面
        window.location = `http://h5test.gofoliday.com/logins?redirect=${window.location.href}`
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
    if (Object.keys(this.props.user.userInfo).length) {
      return (
        <div className="App">
          <Route path="/" exact component={Homepage} />
          <Route path="/starProducts" component={StarProducts} />
          <Route path="/bonus" component={Bonus} />
          <Route path="/details" component={Details} />
          <Route path="/lachineProduct" component={LachineProduct} />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default App
