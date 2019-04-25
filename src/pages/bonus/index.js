import React, { Component } from 'react';
import "./index.css";
import { NavBar, Icon } from 'antd-mobile'
import { reCount } from '@/pages/api/homePage'

class Bonus extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            recMemberCount: 0, // 推荐会员数
            recOrderCount: 0, // 推荐下单数
            totalPrize: 0, // 用户奖励金
        }
    }
    // 获取拉新会员数以及下单成功数
    async getReConut() {
        try {
            let Recount = await reCount()
            let { recMemberCount, recOrderCount, totalPrize } = Recount
            this.setState({
                recMemberCount,
                recOrderCount,
                totalPrize,
            })
        }
        catch (e) {

        }
    }

    componentDidMount() {
        try {
            this.getReConut()
        } catch (e) {
            console.log(e)
        }

    }

    goToDetails() {
        this.props.history.push(
            '/details'
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
                    rightContent={<span style={{ color: '#e9cf8a', fontSize: "14px" }}></span>}
                ><span style={{ fontSize: "16px", color: '#fff' }}>奖励金账户</span></NavBar>
                <div className="available-balance" onClick={this.goToDetails.bind(this)}>
                    <div className="balance-content clearfix">
                        <div className="content-left">
                            <p className="balance">可用余额</p>
                            <p className="data">
                                <span className="yen">&yen;</span>
                                <span className="num">{this.state.totalPrize}</span>
                            </p>
                        </div>
                        <Icon type="right" color="#705c2f" className="content-right" />
                    </div>
                </div>
                <ul className="account">
                    <li className="clearfix accountLi" >
                        <span className="assets">总资产</span>
                        <span className="assets-num">&yen;{this.state.totalPrize}</span>
                    </li>
                    {/* <li className="clearfix accountLi">
                        <span className="stayIn">待入帐</span>
                        <span className="stayIn-num">&yen;100000.00</span>
                    </li> */}
                </ul>
            </div>
        );
    }
}

export default Bonus