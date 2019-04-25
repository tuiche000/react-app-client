import React, { Component } from 'react';
import "./index.css";
import { NavBar, Icon } from 'antd-mobile'

class Rules extends Component {
    constructor(...args) {
        super(...args)

        this.state = {

        }
    }


    componentDidMount() {


    }


    render() {
        return (
            <div className="rules ">
                <NavBar
                    mode="light"
                    style={{ backgroundColor: "#fff" }}
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                    rightContent={<span style={{ color: '#e9cf8a', fontSize: "14px" }}></span>}
                ><span style={{ fontSize: "16px", color: '#fff' }}></span></NavBar>
                <section className="Re-award">
                    <h2 className="plan">复游推荐奖励金计划</h2>
                    <div>
                        <p>定义</p>
                        <p>奖励金：指通过复游推荐奖励金计划获得的奖励。可用于FOLIDAY平台产品预订。</p>
                        <p>销售额：指被推荐人购买产品实付金额，是计算销售奖励金的主要依据。</p>
                    </div>
                    <div>
                        <p>奖励来源：通过完成复游推荐页面中的任务，获取奖励金</p>
                        <p>1.邀请好友注册成为FOLIDAY平台即复游会会员，邀请越多，可获得越多的奖励金，最多可邀请50个好友。</p>
                        <p>2.推荐产品，获得奖励金；同时推荐产品后，如好友打开产品首次预订，则您可获得好友支付金额的3%作为奖励金。您可以推荐产品给不同的好友，每个好友首次预订，您都可以获得奖励金。</p>
                    </div>
                    <div>
                        <p>奖励金的使用规则</p>
                        <p>1.推荐奖励金，在好友出游归来，平台审核后发放，您可以在复游推荐页面中看到。</p>
                        <p>2.实际奖励金，可能因好友支付的金额或部分退款而改变。如果好友支付后退款，则奖励金也同步取消。</p>
                        <p>3.奖励金会积累在您的会员账户中，可以用于预订FOLIDAY平台产品；您可以选择一次性用完，也可以分次使用。如奖励金不足以支付订单金额，则需要补差。</p>
                        <p>4.可获得奖励金的产品，当您进入产品时，会看到相关的提示，如果没有提示的产品，推荐后并不能获得奖励金。</p>
                    </div>
                    <p>奖励金计划的规则、奖励比例、使用规则等所有关于复游推荐的内容，会根据业务开展的情况适时的调整。恕不另行通知，敬请谅解。计划的解释权归复星旅游文化集团所有。</p>
                </section>
            </div>
        );
    }
}

export default Rules