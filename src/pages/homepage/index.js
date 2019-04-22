import React, { Component } from 'react';
import "./index.css";
import { Toast } from 'antd-mobile';
import Dialog from "@/components/Dialog";
import { setShare } from 'fm-ui/lib/utils/share'
import { productList } from '@/pages/api/product'
import { create_qrCode } from '@/pages/api/member'
import { connect } from 'react-redux'
import { reCount } from '@/pages/api/homePage'

@connect((state, props) => Object.assign({}, props, state), {})
class Homepage extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            list_data: [],
            showDialog: false,
            code_data: {}, //二维码数据
            product_data: [], // 明星产品列表数据
            productPageNo: 1, // 明星产品列表页数
            productPageSize: 2, // 明星产品列表单页显示数据
            QR_code: "", // 二维码图片
            recMemberCount: 0, // 推荐会员数
            recOrderCount: 0, // 推荐下单数
            totalPrize: 0, // 用户奖励金
        }
    }
    // 根据手机号创建二维码分享链接
    async create_qrCode(phone) {
        let code_data = await create_qrCode(phone)
        let { qrUrl } = code_data
        this.setState({
            QR_code: qrUrl,
        })
    }
    // 获取明星列表数据
    async getProduct() {
        let product_data = await productList({
            "pageNo": this.state.productPageNo,
            "pageSize": this.state.productPageSize,
        })
        let { result } = product_data || []
        this.setState({
            product_data: result || [],
        })
    }
    // 获取拉新会员数以及下单成功数
    async getReConut() {
        let Recount = await reCount('ACN0gjHRNvIvUOx')
        let { recMemberCount, recOrderCount, totalPrize } = Recount
        this.setState({
            recMemberCount,
            recOrderCount,
            totalPrize,
        })
    }
    async componentDidMount() {
        console.log(this.props.user.userInfo.phone)
        try {
            this.getProduct()
            this.getReConut()
        } catch (e) {
            console.log(e)
        }

        // 设置分享功能
        setShare({
            title: '测试',
            text: '测试',
            imgUrl: 'https://foliday-img.oss-cn-shanghai.aliyuncs.com/h5/download/256.png',
            link: window.location.href
        }).then(function () {
            // _czc.push(["_trackEvent", document.title, "share", this.$route.query.channel])
            // alert("1")
        })


    }

    fnFooterClose() {
        try {
            this.create_qrCode(this.props.user.userInfo.phone)
        } catch (e) {
            console.log(e)
        }
        this.setState({
            showDialog: !this.state.showDialog
        })
    }
    // 跳转明星产品页面
    goToStartProduct() {
        this.props.history.push(
            '/starProducts'
        )
    }
    // 跳转拉新产品页面
    goTolachineProduct() {
        this.props.history.push(
            '/lachineProduct'
        )
    }
    // 跳转奖励金账户页面
    goToBonus() {
        this.props.history.push(
            '/bonus'
        )
    }
    // 轻提示
    showToast() {
        Toast.info('请点击右上角分享按钮', 2);
    }

    render() {
        return (
            <div className="homepage-main">
                {
                    (this.state.showDialog && this.state.QR_code) ? (
                        <Dialog title="长按图片保存" footer_close={this.fnFooterClose.bind(this)}>
                            <img src={this.state.QR_code} alt="" />
                        </Dialog>
                    ) : ''
                }
                {/* <Button onClick={this.fnFooterClose.bind(this)}>customized buttons</Button> */}
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
                        <div className="bonus" onClick={this.goToBonus.bind(this)}>
                            <p>我的奖励金</p>
                            <p>
                                <span>&yen;</span>
                                <span className="num">{this.state.totalPrize}</span>
                            </p>
                        </div>
                        <div className="success">
                            <div className="success-lachine" onClick={this.goTolachineProduct.bind(this)}>
                                <p>拉新会员成功数</p>
                                <p>{this.state.recMemberCount}</p>
                            </div>
                            <div className="success-order" onClick={this.goTolachineProduct.bind(this)}>
                                <p>下单成功数</p>
                                <p>{this.state.recOrderCount}</p>
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
                            <span onClick={this.goToStartProduct.bind(this)}>更多产品</span>
                        </p>
                    </div>
                    <ul>
                        {
                            this.state.product_data.map(item => {
                                return (
                                    <li className="innisfree-lis" key={item.productId}>
                                        <p className="substance" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTittle}</p>
                                        <p className="amount">
                                            <span className="num">&yen;{item.productPrice}</span>
                                            <span>起</span>
                                            <span className="num">{item.productType}</span>
                                            <span>奖励金</span>
                                        </p>
                                        <p className="immediately"  onClick={this.fnFooterClose.bind(this)} >立刻推荐</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
            </div>
        );
    }
}

export default Homepage
