import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon } from 'antd-mobile'
import { lachineList, recommendList } from '../api/lachineProduct'

class LachineProduct extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            Lachine_list: [], // 拉新列表数据
            recommend_list: [], // 产品列表数据
            initialPage: 0,
        }
    }

    // 获取拉新列表
    async getLachineList() {
        let Lachine_list = await lachineList({
            "pageNo": 1,
            "pageSize": 10,
        })
        let { result } = Lachine_list
        this.setState({
            Lachine_list: result || [],
        })
    }

    // 获取产品推荐列表数据
    async getRecommendList() {
        let recommend_list = await recommendList({
            "pageNo": 1,
            "pageSize": 1,
        })
        console.log(recommend_list)
    }

    componentDidMount() {
        try {
            this.getLachineList()
            this.getRecommendList()
        } catch (e) {
            console.log(e)
        }
        // tab栏标题
        const tabs = [
            { title: '拉新会员' },
            { title: '产品推荐' },
        ];

        this.setState({
            tabs,
        })
    }

    render() {
        return (
            <div className="main ">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                ></NavBar>
                <div className="lachineProduct ">
                    <Tabs tabs={this.state.tabs} initialPage={this.state.initialPage} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }} animated={true} useOnPan={true}>
                        <div>
                            <section className="lachine" >
                                <ul>
                                    {this.state.Lachine_list.map(item => (
                                        <li key={item.recommendId}>
                                            <div className="lachine-top clearfix">
                                                <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                                <div className="characters">
                                                    <p className="characters-telephone">{item.mobile}</p>
                                                    <p className="characters-time">
                                                        <span>推荐时间</span>
                                                        <span>{item.recommendDate}</span>
                                                        <span></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                        <div>
                            <section className="product" >
                                <ul>
                                    <li>
                                        <div className="product-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-describe">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="product-bottom">
                                            <span className="bonus-issued">奖励金已发放</span>
                                            <span className="icon"></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="product-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-describe">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="product-bottom">
                                            <span className="bonus-pending">奖励金待入账</span>
                                            <span className="icon"></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="product-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-describe">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="product-bottom">
                                            <span className="bonus-fail">审核失败 奖励金1.00取消发放</span>
                                            <span className="icon"></span>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default LachineProduct