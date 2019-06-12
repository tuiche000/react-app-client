import React, { Component } from 'react';
import "./index.css";

class Propaganda extends Component {
  constructor(...args) {
    super(...args)
    this.state = {
      share_url: this.props.location.search.split("loginUrl=")[1]
    }
  }

  componentDidMount() {
    
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