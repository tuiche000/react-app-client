import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon } from 'antd-mobile'

class LachineProduct extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            list_data: []
        }
    }

    componentDidMount() {
        const tabs = [
            { title: '拉新会员' },
            { title: '产品推荐' },
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
        
        this.props.history.push(
            '/'
        )
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
                    <Tabs tabs={this.state.tabs} initialPage={0} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }} animated={true} useOnPan={true}>
                        <div>
                            <section className="lachine" >
                                <ul>
                                    <li>
                                        <div className="lachine-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-telephone">18888888888</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
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