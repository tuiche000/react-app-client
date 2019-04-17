import React, { Component } from 'react';
import "./index.css";
import { NavBar, Icon } from 'antd-mobile'

class Bonus extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            list_data: []
        }
    }

    componentDidMount() {
        const tabs = [
            { title: '收入' },
            { title: '支出' },
            { title: '待入' },
        ];
        let list_data = [
            {
                id: 1,
                title: '马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票1',
                price: 6600,
                price2: 200
            },
            {
                id: 2,
                title: '马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票2',
                price: 3333,
                price2: 200
            }
        ]
        this.setState({
            list_data,
            tabs
        })
    }

    fnGoto() {
        console.log('fnGoto')
        this.props.history.push(
            '/'
        )
    }

    render() {
        return (
            <div className="bonus ">
                <NavBar
                    mode="light"
                    style={{ backgroundColor: "#322d24" }}
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                    rightContent={<span style={{ color: '#e9cf8a', fontSize: "14px" }}>支付管理</span>}
                ><span style={{ fontSize: "16px", color: '#fff' }}>奖励金账户</span></NavBar>
                <div className="available-balance">
                    <div className="balance-content clearfix">
                        <div className="content-left">
                            <p className="balance">可用余额</p>
                            <p className="data">
                            <span className="yen">&yen;</span>
                            <span className="num">100000</span>
                            </p>
                        </div>
                        <Icon type="right" color="#705c2f" className="content-right" />
                    </div>
                </div>
                <ul className="account">
                    <li className="clearfix accountLi">
                        <span className="assets">总资产</span>
                        <span className="assets-num">&yen;100000.00</span>
                    </li>
                    <li className="clearfix accountLi">
                        <span className="stayIn">待入帐</span>
                        <span className="stayIn-num">&yen;100000.00</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Bonus