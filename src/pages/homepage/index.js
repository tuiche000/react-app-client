import React, { Component } from 'react';
import "./index.css";
import { Button } from 'antd-mobile';
import Dialog from "../../components/Dialog";

class Homepage extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            list_data: [],
            showDialog: false
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

    fnFooterClose() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    render() {
        return (
            <div className="homepage-main">
                {
                    this.state.showDialog ? (
                        <Dialog title="推荐产品成功" footer_close={this.fnFooterClose.bind(this)}>
                            <h2>dsasdsds</h2>
                        </Dialog>
                    ) : ''
                }
                <Button onClick={this.fnFooterClose.bind(this)}>customized buttons</Button>
                <section className="homepage">
                    <header>
                        <ul className="clearfix">
                            <li>
                                <img src="assets/imgs/header-portrait.jpg" alt="" />
                                <span>爱旅行</span>
                            </li>
                            <li>推荐规则</li>
                        </ul>
                    </header>
                    <section className="aggregation">
                        <div className="bonus">
                            <p>我的奖励金</p>
                            <p>
                                <span>&yen;</span>
                                <span className="num">25191</span>
                            </p>
                        </div>
                        <div className="success">
                            <div className="success-lachine">
                                <p>拉新会员成功数</p>
                                <p>92312</p>
                            </div>
                            <div className="success-order ">
                                <p>下单成功数</p>
                                <p>18</p>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="recommended-tasks">
                    <div className="title">
                        <h3>推荐任务</h3>
                        <p>做任务拿奖励金</p>
                    </div>
                    <div className="tasks-list">
                        <ul>
                            <li className="frist-lachine">
                                <div className="frist-lachine-right">
                                    <img src="./imgs/header-portrait.jpg" alt="" />
                                    <div className="content">
                                        <p>首次拉新送奖励<span className="icon"></span></p>
                                        <p>邀请一位好友注册成功，送两个奖励金</p>
                                    </div>
                                </div>
                                <span>已完成</span>
                            </li>
                            <li className="frist-lachine">
                                <div className="frist-lachine-right">
                                    <img src="./imgs/header-portrait.jpg" alt="" />
                                    <div className="content">
                                        <p>拉新10位好友<span className="icon"></span></p>
                                        <p>奖励翻倍，还能免费升级会员权益</p>
                                    </div>
                                </div>
                                <span>已完成</span>
                            </li>
                            <li className="frist-lachine fifty">
                                <div className="frist-lachine-right">
                                    <img src="./imgs/header-portrait.jpg" alt="" />
                                    <div className="content">
                                        <p>拉新50位好友<span className="icon"></span></p>
                                        <p>奖励全随你花，兑换产品不限</p>
                                    </div>
                                </div>
                                <span><span>25</span><span>/50</span><span>进行中</span></span>
                            </li>
                            <li className="frist-lachine receive-tasks">
                                <div className="frist-lachine-right">
                                    <img src="./imgs/header-portrait.jpg" alt="" />
                                    <div className="content">
                                        <p>推荐产品一次<span className="icon"></span></p>
                                        <p>分享任意产品，送3个奖励金</p>
                                    </div>
                                </div>
                                <span>领取任务</span>
                            </li>
                            <li className="frist-lachine receive-tasks">
                                <div className="frist-lachine-right">
                                    <img src="./imgs/header-portrait.jpg" alt="" />
                                    <div className="content">
                                        <p>推荐产品成功预定一次<span className="icon"></span></p>
                                        <p>好友成功购买推荐产品，赚订单3%</p>
                                    </div>
                                </div>
                                <span>领取任务</span>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className="integral recommended-tasks">
                    <div className="integral-top  clearfix">
                        <div className="title">
                            <h3>积分排名</h3>
                            <p>金榜Top10</p>
                        </div>
                        <p>
                            <span>更多排名</span>
                            <span className="icon"></span>
                        </p>
                    </div>
                    <ul className="integral-list">
                        <li className="integral-list-li">
                            <div className="list-left">
                                <span className="list-left-one">1</span>
                                <img src="./imgs/header-portrait.jpg" alt="" />
                                <div className="content">
                                    <p>爱赚钱</p>
                                    <p>Lv.01</p>
                                </div>
                            </div>
                            <div className="list-right">
                                <p><span>&yen;</span>800.<span>00</span></p>
                                <p>累计奖励金</p>
                            </div>
                        </li>
                        <li className="integral-list-li">
                            <div className="list-left">
                                <span className="list-left-two">2</span>
                                <img src="./imgs/header-portrait.jpg" alt="" />
                                <div className="content">
                                    <p>爱赚钱</p>
                                    <p>Lv.01</p>
                                </div>
                            </div>
                            <div className="list-right">
                                <p><span>&yen;</span>800.<span>00</span></p>
                                <p>累计奖励金</p>
                            </div>
                        </li>
                        <li className="integral-list-li">
                            <div className="list-left">
                                <span className="list-left-there">3</span>
                                <img src="./imgs/header-portrait.jpg" alt="" />
                                <div className="content">
                                    <p>爱赚钱</p>
                                    <p>Lv.01</p>
                                </div>
                            </div>
                            <div className="list-right">
                                <p><span>&yen;</span>800.<span>00</span></p>
                                <p>累计奖励金</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className="innisfree integral recommended-tasks">
                    <div className="integral-top  clearfix">
                        <div className="title">
                            <h3>明星产品</h3>
                            <p>推荐一下产品获取双倍奖励金</p>
                        </div>
                        <p>
                            <span>更多产品</span>
                        </p>
                    </div>
                    <ul>
                        <li className="innisfree-lis">
                            <p className="substance">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                            <p className="amount">
                                <span className="num">&yen;6600</span>
                                <span>起</span>
                                <span className="num">200</span>
                                <span>奖励金</span>
                            </p>
                            <p className="immediately">立刻推荐</p>
                        </li>
                        <li className="innisfree-lis">
                            <p className="substance">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                            <p className="amount">
                                <span className="num">&yen;6600</span>
                                <span>起</span>
                                <span className="num">200</span>
                                <span>奖励金</span>
                            </p>
                            <p className="immediately">立刻推荐</p>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
}

export default Homepage
