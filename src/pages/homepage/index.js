import React, { Component } from 'react';
import "./index.css";
import { Toast , Icon} from 'antd-mobile';
import Dialog from "@/components/Dialog";
// import { setShare } from 'fm-ui/lib/utils/share'
import { productList } from '@/pages/api/product'
import { tasklist } from '@/pages/api/tasklist'
import { connect } from 'react-redux'
import { reCount, shareUrl } from '@/pages/api/homePage'
import { Prius } from 'foliday-bridge'
window.Prius = Prius

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
            productPageSize: 3, // 明星产品列表单页显示数据
            QR_code: "", // 二维码图片
            recMemberCount: 0, // 推荐会员数
            recOrderCount: 0, // 推荐下单数
            totalPrize: 0, // 用户奖励金
            share_url: "", // 分享地址
            task_list: [], // 推荐任务列表数据
            iconurl: '',// 用户icon地址 
        }
    }

    // 创建二维码分享链接
    async getQrCode(productId) {
        try {
            let code_data = await shareUrl({
                url: "http://h5test.gofoliday.com/product?productId=" + productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    // 获取明星列表数据
    async getProduct() {
        try {
            let productData = await productList({
                "pageNo": this.state.productPageNo,
                "pageSize": this.state.productPageSize,
            })
            let { result } = productData || []
            this.setState((prevState) => {
                // console.log('prevState', prevState)
                return {
                    product_data: result || [],
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    // 获取拉新会员数以及下单成功数
    async getReConut() {
        try {
            let Recount = await reCount()
            let { recMemberCount, recOrderCount, totalPrize, } = Recount
            this.setState({
                recMemberCount,
                recOrderCount,
                totalPrize,
            })
        }
        catch (e) {

        }
    }
    // 获取分享地址
    async getShareUrl(item) {
        try {
            let share_url = await shareUrl({
                url: "http://h5test.gofoliday.com/product?productId=" + item.productId,
                mode: 5,
            })
            this.setState({
                share_url: share_url.shareUrl,
            })
            // 设置app右上角分享功能
            // setShare({
            //     title: '测试',
            //     text: '测试',
            //     imgUrl: 'https://foliday-img.oss-cn-shanghai.aliyuncs.com/h5/download/256.png',
            //     link: this.state.share_url
            // }).then(function () {
            //     // _czc.push(["_trackEvent", document.title, "share", this.$route.query.channel])
            //     // alert("1")
            // })

            // 设置分享功能
            Prius.appEventCallback({
                callId: 'POP_SHARE',
                data: {
                    title: item.productName,
                    url: this.state.share_url,
                    description: item.productSubTittle,
                    iconUrl: "https://foliday-img.oss-cn-shanghai.aliyuncs.com/h5/download/256.png",
                },
                listener: function (data) {
                    console.log(JSON.stringify(data))
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    // 获取推荐任务
    async getTasklist() {
        try {
            let task_list = await tasklist({
                "pageNo": 1,
                "pageSize": 10,
            })
            let { result } = task_list
            this.setState({
                task_list: result,
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    async componentDidMount() {
        try {
            this.getProduct()
            this.getReConut()
            this.getTasklist()
            this.getTasklist()
        } catch (e) {
            console.log(e)
        }
        this.getIconurl()
    }

    fnFooterClose(item) {
        if (!this.state.showDialog) {
            try {
                if (window.Prius.isInsideApp) {
                    this.getShareUrl(item)
                } else {
                    this.getQrCode(item.productId)
                }
            } catch (e) {
                console.log(e)
            }
        }
        this.setState({
            showDialog: !this.state.showDialog
        })
    }
    // 修改用户icon
    getIconurl() {
        let url = this.props.user.userInfo.iconurl
        if (url) {
            return this.setState({
                iconUrl: url.indexOf('http:') > -1 ? url : 'http://unitest.fosunholiday.com/' + url
            })
        }
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
    // 跳转推荐规则页面
    goToRules() {
        this.props.history.push(
            '/rules'
        )
    }
    // 跳转M站个人中心页面
    goPersonalCenter() {
        alert("1")
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
                <Icon type="left" color="#f5a623"  style={{marginLeft: "15px",marginTop:"15px"}} onClick={this.goPersonalCenter.bind(this)} />
                <section className="homepage">
                    <header>
                        <ul className="clearfix">
                            <li>
                                <img src={this.state.iconUrl} alt="" />
                                <span>{this.props.user.userInfo.nameCh}</span>
                            </li>
                            <li onClick={this.goToRules.bind(this)}>推荐规则</li>
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
                            {this.state.task_list && this.state.task_list.map((item, index) => (
                                <li className="frist-lachine" key={index}>
                                    <div className="frist-lachine-right">
                                        <img src="./imgs/header-portrait.jpg" alt="" />
                                        <div className="content">
                                            <p>{item.activityName}<span className="icon"></span></p>
                                            <p>{item.activityDestription}</p>
                                        </div>
                                    </div>
                                    <span>已完成</span>
                                </li>
                            ))}
                            {/* <li className="frist-lachine">
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
                            </li> */}
                        </ul>
                    </div>
                </section>
                {/* <section className="integral recommended-tasks">
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
                </section> */}
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
                                        <p className="immediately" onClick={this.fnFooterClose.bind(this, item)} >立刻推荐</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                <p onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }}>推出登陆</p>
            </div>
        );
    }
}

export default Homepage
