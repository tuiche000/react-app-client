import React, { Component } from 'react';
import "./index.css";

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
                {/* <NavBar
                    mode="light"
                    style={{ backgroundColor: "#fff" }}
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                    rightContent={<span style={{ color: '#e9cf8a', fontSize: "14px" }}></span>}
                ><span style={{ fontSize: "16px", color: '#fff' }}></span></NavBar> */}
                <section className="Re-award">
                    <h2 className="plan" style={{ fontWeight: "600" }}>复游荐计划</h2>
                    <p style={{ fontSize: "10px" }}>复游荐计划（以下简称“计划”）允许复游会会员（以下简称“会员”）通过邀请朋友注册成为复游会新用户来赢取复游会积分；通过推荐朋友购买复星旅文FOLIDAY平台商品或服务赢取奖励金。</p>
                    <p style={{ height: "15px" }}></p>
                    <div>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>积分：</span>会员通过复游荐计划，成功邀请朋友注册成为复游会新会员获得的奖励。</p>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>奖励金：</span>会员通过复游荐计划，成功推荐朋友购买复星旅文FOLIDAY平台商品或服务获得的奖励。</p>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>销售额：</span>指被推荐人购买产品实付金额，是计算销售奖励金的主要依据。</p>
                    </div>
                    <p style={{ height: "15px" }}></p>
                    <div>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>如何赢取积分：</span>通过推荐朋友注册成为复游会会员，最多可赢取6,800积分奖励。具体奖励如下：老会员每成功邀请一位新朋友注册成为复游会会员，将获得100积分奖励，其中第5位，第10位成功邀请注册将额外获得400积分奖励，第50位成功邀请注册奖额外获得900积分奖励。第51位后暂无奖励。</p>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>积分发放：</span>成功邀请注册后，平台后台审核后，最晚7各工作日发放完毕，可在“我的积分”查询积分。</p>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>积分奖励使用：</span>可用于FOLIDAY平台积分商城产品兑换，不可提现。如积分不足以支付订单金额，则需要补差。</p>
                    </div>
                    <p style={{ height: "15px" }}></p>
                    <div>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>如何赢取奖励金：</span>推荐产品，获得奖励金。推荐产品后，如好友打开产品首次预订，则您可获得好友支付金额的3%作为奖励金。您可以推荐产品给不同的好友，每个好友首次预订，您都可以获得奖励金。</p>
                        <p style={{ fontSize: "10px" }}>
                            <span style={{ fontWeight: "600" }}>奖励金发放：</span>
                            <p><span style={{ fontWeight: "600" }}>1.</span>推荐奖励金，在好友出游归来，平台审核后发放，您可以在复游推荐页面中看到。</p>
                            <p><span style={{ fontWeight: "600" }}>2.</span>实际奖励金，可能因好友支付的金额或部分退款而改变。如果好友支付后退款，则奖励金也同步取消。</p>
                            <p><span style={{ fontWeight: "600" }}>3.</span>可获得奖励金的产品，当您进入产品时，会看到相关的提示，如果没有提示的产品，推荐后并不能获得奖励金。</p>
                        </p>
                        <p style={{ fontSize: "10px" }}><span style={{ fontWeight: "600" }}>奖励金使用：</span>可用于FOLIDAY平台积分商城产品兑换，不可提现。如积分不足以支付订单金额，则需要补差。</p>
                    </div>
                    <p style={{ height: "15px" }}></p>
                    <p style={{ fontSize: "10px" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邀请注册赢取积分或推荐购买赢取奖励金计划的规则、奖励比例、使用规则等所有关于复游推荐的内容，会根据业务开展的情况适时的调整，并更新在该页面，恕不另行通知，敬请谅解。计划的解释权归复星旅游文化集团所有。</p>
                </section>
            </div>
        );
    }
}

export default Rules