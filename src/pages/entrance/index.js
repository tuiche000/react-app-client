import React, { Component } from 'react';
import "./index.css";

class Entrance extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            
        }
    }

    componentDidMount() {

    }

    goToHomepage() {
        this.props.history.push(
            '/homepage'
        )
    }

    render() {
        return (
            <div className="entrance">
                <img src="https://foliday-img.oss-cn-shanghai.aliyuncs.com/fuyoujian/entrance.png" alt=""/>
                <p onClick={this.goToHomepage.bind(this)}>我要加入</p>
            </div>
        );
    }
}

export default Entrance