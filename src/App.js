import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Route } from 'react-router-dom'
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

  // 获取用户信息
  async account_current() {
    let userInfo = await account_current()
    // 判断isStaff 是不是员工
    if (userInfo.isStaff !== 1) {
      alert('不是员工！')
      return
    }
    this.props.setUserInfo(userInfo)
  }

  // 检测是否登录
  async checkLogin() {
    // 是否有用户信息
    if (!Object.keys(this.props.user.userInfo).length) {
      let token = getQueryVariable('token')
      let folidayToken = this.props.user.folidayToken || localStorage.getItem(SET_FOLIDAY_TOKEN)
      // 没有token或者storeage的token
      if (!folidayToken) {
        // query上有token就存token并且存用户信息
        if (token) {
          this.props.setFolidayToken(token)
          await this.account_current()
          this.props.history.replace(this.props.location.pathname)
          return
        }
        // 如果在app里
        if (window.Prius.isInsideApp) {
          window.Prius.appEventCallback({
            callId: "TOKEN",
            data: {},
            listener: function (data) {
              alert(data)
            }
          });
          return;
        }
        // 啥都没有就滚去(测试)登录页面
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
          {
            Routes.map((item, index) => {
              return (
                <Route key={index} path={item.path} exact component={item.component} />
              )
            })
          }
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
