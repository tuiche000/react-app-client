import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { SET_FOLIDAY_TOKEN, setFolidayToken, setUserInfo } from './actions';
import { Prius } from 'foliday-bridge'
import { getQueryVariable } from './utils/util'
import { account_current } from './pages/api/account'
import { Toast } from 'antd-mobile';
window.Prius = Prius

@connect((state, props) => Object.assign({}, props, state), {
  setFolidayToken, setUserInfo
})
class App extends Component {
  // constructor(...args) {
  //   super(...args)
  // }

  // 获取用户信息
  async account_current() {
    try {
      let userInfo = await account_current()
      // 判断isStaff 是不是员工
      if (userInfo.isStaff !== 1) {
        Toast.fail('您不是复星员工！', 2);
        // return
      }
      this.props.setUserInfo(userInfo)
    }
    catch (e) {
      //
    }
  }

  // 检测是否登录
  async checkLogin() {
    // 如果没有用户信息在redux中
    if (!Object.keys(this.props.user.userInfo).length) {
      let Token = getQueryVariable('token')
      // 如果在app里
      if (window.Prius.isInsideApp) {
        let _this = this
        const fnLoginBoth = async (data) => {
          // 有token
          let { token } = data
          Token = token
          _this.props.setFolidayToken(Token)
          await _this.account_current()
        }

        // 没登录取登录然后取token
        Prius.addCallback({
          callId: "login_in",
          listener: function (data) {
            if (data.code === "0") {
              fnLoginBoth(data)
            }
          }
        });
        // 如果app登录了直接取token取拿用户信息
        window.Prius.appEventCallback({
          callId: "LOGIN",
          data: {},
          listener: function (data) {
            if (data.token) {
              fnLoginBoth(data)
            }
          }
        })
      }
      // 不在app里
      else {
        let folidayToken = this.props.user.folidayToken || localStorage.getItem(SET_FOLIDAY_TOKEN)
        // redux上没有folidayToken 或者 storeage里没有 folidayToken
        if (!folidayToken) {
          // query上有token
          if (Token) {
            this.props.setFolidayToken(Token)
            await this.account_current()
            return
          }
          // 啥都没有就滚去(测试)登录页面
          window.location = `http://h5test.gofoliday.com/logins?redirect=${window.location.href}`
        }
        // redux有folidayToken 或者 storeage有folidayToken
        else {
          await this.account_current()
          // 清除query上的token
          Token && this.props.history.replace(this.props.location.pathname)
        }
      }
    }
  }

  componentDidMount() {
    // console.log(this.props)
    console.log('DidMount')
    this.checkLogin();
  }

  componentDidUpdate() {
    console.log('DidUpdate')
    // this.checkLogin();
  }

  render() {
    console.log('render')
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
          <div style={{ height: "30px" }}></div>
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
