import React, { Component } from 'react';
import "./index.css";
import { shareUrl } from '@/pages/api/homePage'
import hostConfig from '@/hostConfig'

class Propaganda extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      share_url: ""
    }
  }

  componentDidMount() {
    this.getShareUrl()
  }
  async getShareUrl() {
    let share_url = await shareUrl({
      url: hostConfig.mBase + 'logins?redirect=' + hostConfig.mBase,
      mode: 5,
    })
    this.setState({
      share_url: share_url.shareUrl
    })
  }
  goLogins() {
    window.location.href = this.state.share_url
  }

  render() {
    return (
      <div className="propaganda">
        <img src="https://foliday-img.oss-cn-shanghai.aliyuncs.com/propaganda.png" alt="" />
        <p onClick={this.goLogins.bind(this)}>我要加入</p>
      </div>
    );
  }
}

export default Propaganda