import React, { Component } from 'react';
import "./index.css"

class LachineProduct extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            list_data: []
        }
    }

    componentDidMount() {
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
            list_data
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
            <div className="lachineProduct ">
                <ul className="Tab clearfix">
                    <li className="lachine-tab">拉新会员</li>
                    <li className="product-tab">产品推荐</li>
                </ul>
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
        );
    }
}

export default LachineProduct