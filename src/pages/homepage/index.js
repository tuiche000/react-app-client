import React, { Component } from 'react';
import "./index.css";
import { Icon } from 'antd-mobile';
import Dialog from "@/components/Dialog";
// import { setShare } from 'fm-ui/lib/utils/share'
import hostConfig from '@/hostConfig'
import { productList } from '@/pages/api/product'
import { tasklist } from '@/pages/api/tasklist'
import { connect } from 'react-redux'
import { reCount, shareUrl, recommendProduct } from '@/pages/api/homePage'
import { Prius } from 'foliday-bridge'
import { fnCanvas, startProductCanvas } from '@/utils/util'
import accountEntry from '@/pages/assets/imgs/accountEntry.png'
import complete from '@/pages/assets/imgs/complete.png'
import problem from '@/pages/assets/imgs/problem.png'
import welfareIcon from '@/pages/assets/imgs/icon_coupon_welfare.png'
import ImgInvitationCard from './imgs/invitationCard.png'
import head_defult from '@/pages/assets/imgs/head_defult.png'

@connect((state, props) => Object.assign({}, props, state), {})
class Homepage extends Component {
    constructor(...args) {
        super(...args)
        this.refCanvas = React.createRef();
        this.refBox = React.createRef();
        this.fnCanvas = fnCanvas.bind(this)
        this.startProductCanvas = startProductCanvas.bind(this)
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
            Activityshare_url: '',
            task_list_summary: {},// 推荐主任务列表数据
            task_list: [], // 推荐子任务列表数据
            iconurl: '',// 用户icon地址 
            recommend_roduct: [], // 推荐任务中的推荐产品列表
            canvasImg: "", // canvas生成的图片
            dropDown: true, // 推荐列表下拉状态
        }

    }

    async componentDidMount() {
        this.getIconurl()
        try {
            this.getProduct()
            this.getReConut()
            this.getTasklist()
            this.getRecommendProduct()
        } catch (e) {
            // console.log(e)
        }
        // 将页面滑动到顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    // H5明星产品推荐图片
    async getQrCode(item) {
        try {
            let code_data = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })


            // 获取用户头像地址并设置默认值
            let url = this.props.user.userInfo.iconurl
            if (url) {
                url = url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
            } else {
                url = head_defult
            }
            // 生成明星产品分享图
            this.startProductCanvas({
                productImg: item.productImgUrl,
                iconurl: url,
                code: this.state.QR_code,
                productSubTittle: item.productSubTittle,
                productPrice: item.productPrice,
                nameCh: this.props.user.userInfo.nameCh,
                firstOrder: "首单立享50元优惠",
                Official: "复星旅文FOLIDAY 官方直销",
                welfareIcon,
            }).then(res => {
                this.state.canvasImg = <img src={res.src} alt="cover" />
                this.setState((state) => {
                    return {
                        showDialog: !this.state.showDialog
                    }
                })
            })
        }
        catch (e) {
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
                return {
                    product_data: result || [],
                }
            })
        }
        catch (e) {
            // console.log(e)
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
    // 获取明星产品分享地址以及APP分享
    async getShareUrl(item) {
        // 获取用户头像地址并设置默认值 
        let url = this.props.user.userInfo.iconurl
        if (this.props.user.userInfo.iconurl) {
            url = url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
        } else {
            url = head_defult
        }

        // 获取app分享地址
        try {
            let share_url = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 5,
            })

            // 获取明星产品分享二维码图片
            let code_data = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
            // 设置分享功能
            Prius.appEventCallback({
                callId: 'POP_SHARE',
                data: {
                    title: item.productSubTittle,
                    url: share_url.shareUrl,
                    description: item.productName,
                    iconUrl: item.productImgUrl.indexOf('http:') > -1 ? item.productImgUrl : "http:" + item.productImgUrl,
                    canvasImg: {
                        type: 2,
                        message: {
                            productImg: item.productImgUrl.indexOf('http:') > -1 ? item.productImgUrl : "http:" + item.productImgUrl,
                            iconurl: url,
                            code: this.state.QR_code,
                            productSubTittle: item.productSubTittle,
                            productPrice: item.productPrice,
                            nameCh: this.props.user.userInfo.nameCh,
                            productId: item.productId,
                            firstOrder: "首单立享50元优惠",
                            Official: "复星旅文FOLIDAY 官方直销",
                            productType: item.productType,
                            welfareIcon: "http://image.fosunholiday.com/app/3.0/recommend/icon_coupon_welfare.png",
                        }
                    },
                },
                listener: function (data) {
                    // console.log(JSON.stringify(data))
                }
            })
        }
        catch (e) {
            // console.log(e)
        }
    }
    // 获取推荐任务中的推荐产品列表
    async getRecommendProduct() {
        try {
            let recommend_roduct = await recommendProduct({
                size: 1,
            })
            this.setState({
                recommend_roduct,
            })
        } catch (e) {
            // console.log(e)
        }
    }
    // 获取推荐任务列表
    async getTasklist() {
        try {
            let task_list = await tasklist({
                "pageNo": 1,
                "pageSize": 10,
            })
            let { result } = task_list
            result.map((item) => {
                item.active = true
            })
            this.setState({
                task_list: result,
            })
        }
        catch (e) {
            // console.log(e)
        }
    }

    // 设置明星产品立即推荐分享二维码以及app分享
    fnFooterClose(item, e) {
        e && e.stopPropagation();
        e && e.nativeEvent.stopImmediatePropagation();
        if (item) {
            if (window.Prius.isInsideApp) {
                this.getShareUrl(item)
            } else {
                this.getQrCode(item)
            }
        }
        this.setState((state) => {
            if (state.canvasImg) return {
                showDialog: !this.state.showDialog,
                canvasImg: '',
            }
        })
    }
    // 修改用户icon
    getIconurl() {
        let url = this.props.user.userInfo.iconurl
        if (url) {
            return this.setState({
                iconUrl: url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
            })
        }
    }
    // 获取推荐任务二维码图片
    async getActivityQrCode() {
        try {
            let code_data = await shareUrl({
                url: hostConfig.mBase + 'logins?redirect=' + hostConfig.mBase,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })

            // 生成推荐任务分享图片

            let url = this.props.user.userInfo.iconurl
            if (url) {
                url = url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
            } else {
                url = head_defult
            }

            this.fnCanvas({
                backgroundImg: ImgInvitationCard,
                iconurl: url,
                code: this.state.QR_code,
                nameCh: this.props.user.userInfo.nameCh,
            }).then(res => {
                this.state.canvasImg = <img src={res.src} alt="cover" />
                this.state.taskImgSrc = res.src
                this.setState((state) => {
                    return {
                        showDialog: !this.state.showDialog
                    }
                })
            })

        }
        catch (e) {
            // console.log(e)
        }
    }
    // 设置推荐任务APP分享 
    async getActivityShareUrl() {
        try {
            let share_url = await shareUrl({
                url: hostConfig.mBase + 'logins?redirect=' + hostConfig.mBase,
                mode: 5,
            })
            this.setState({
                Activityshare_url: share_url.shareUrl,
            })
            // 获取推荐任务分享二维码
            let code_data = await shareUrl({
                url: hostConfig.mBase + 'logins?redirect=' + hostConfig.mBase,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
            // 设置分享功能
            Prius.appEventCallback({
                callId: 'POP_SHARE',
                data: {
                    title: "你有一封限量邀请函",
                    url: this.state.Activityshare_url,
                    description: "你的好友发来一封邀请，邀请你加入FOLIDAY复星旅文，让你和他同享高品质度假旅行。",
                    iconUrl: "https://foliday-img.oss-cn-shanghai.aliyuncs.com/h5/download/256.png",
                    canvasImg: {
                        type: 1,
                        message: {
                            iconurl: this.state.iconUrl ? this.state.iconUrl : "https://foliday-img.oss-cn-shanghai.aliyuncs.com/fuyoujian/head_defult.png",
                            code: this.state.QR_code,
                            nameCh: this.props.user.userInfo.nameCh,
                        }
                    },
                },
                listener: function (data) {
                    // console.log(JSON.stringify(data))
                }
            })
        }
        catch (e) {
            // console.log(e)
        }
    }
    // 推荐任务小图标弹框   不修改状态
    fnChangeActivity() {
        try {
            if (window.Prius.isInsideApp) {
                this.getActivityShareUrl()
            } else {
                this.getActivityQrCode()
            }
        } catch (e) {
            // console.log()
        }
        this.setState((state) => {
            if (state.canvasImg) return {
                showDialog: !this.state.showDialog,
                canvasImg: '',
            }
        })
    }

    // 修改推荐下拉框状态
    fnChangeDropDownState(index) {
        let arr = this.state.task_list
        arr[index].active = !arr[index].active
        this.setState({
            task_list:arr
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
    // 跳转推荐规则页面
    goToRules() {
        this.props.history.push(
            '/rules'
        )
    }
    // 跳转产品列表
    goProductList(productId) {
        if (window.Prius.isInsideApp) {
            Prius.appEventCallback({
                'callId': 'OPEN_DETAIL',
                data: {
                    productId,
                },
                listener: function (data) {
                }
            })
        } else {
            window.location.href = hostConfig.mBase + "product?productId=" + productId
        }

    }
    render() {
        return (
            <div className="homepage-main">
                {
                    (this.state.showDialog) ? (
                        <Dialog footer_close={this.fnFooterClose.bind(this)}>
                            {this.state.canvasImg}
                        </Dialog>
                    ) : ''
                }
                <canvas ref={this.refCanvas} id="aa" width="320px" height="568px" style={{ display: 'none', position: 'absolute', zIndex: -1 }}></canvas>
                <section className="homepage">
                    <header>
                        <ul className="clearfix">
                            <li>
                                <span className="user">
                                    <img src={`${(this.state.iconUrl ? this.state.iconUrl : "https://foliday-img.oss-cn-shanghai.aliyuncs.com/fuyoujian/head_defult.png")}`} alt="" />
                                </span>
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
                        <div className="success" >
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
                            <li>
                                {
                                    this.state.task_list.map((item, index) => {
                                        return (
                                            <ul key={index}>
                                                <li className="frist-lachine fifty" style={item.active ? { borderBottom: "1px solid #ccc" } : { borderBottom: "none" }}>
                                                    <div className="frist-lachine-right">
                                                        <img style={{ width: "40px", marginTop: "0px" }} src={item.activityImgUrl} alt="" />
                                                        <div className="content">
                                                            <p>{item.activityName}</p>
                                                            <p>{item.activityDestription}</p>
                                                        </div>
                                                    </div>
                                                    {item.activityStatus === 1 && <span style={{ padding: "3px 10px", color: "#fff" }} onClick={this.fnChangeActivity.bind(this)}>我要拉新</span>}
                                                    {item.activityStatus === 2 && <span onClick={this.fnChangeActivity.bind(this)}><span>{item.activityStart}</span><span>/{item.activityEnd}</span><span>进行中</span></span>}
                                                    {item.activityStatus === 3 && <span style={{ padding: "3px 10px", color: "#ac9987", backgroundColor: "#f1e8d0" }} onClick={this.fnChangeActivity.bind(this)}>已完成</span>}
                                                    <div className="dropDown" onClick={this.fnChangeDropDownState.bind(this,index)}>
                                                        <Icon type={item.active ? "down" : "up"} color="#cca846" />
                                                    </div>
                                                </li>
                                                {/* f1e8d0 */}
                                                <li style={item.active ? { display: "none" } : { display: "block" }} className="dropDownBox">
                                                    <ul>
                                                        {item.stageListDTOS && (
                                                            item.stageListDTOS.map((items, indexx) => {
                                                                return (
                                                                    <li className="frist-lachine" key={indexx}>
                                                                        <div className="frist-lachine-right">
                                                                            {items.activityStatus === 1 && <img src="http://image.fosunholiday.com/app/3.0/recommend/notStarted.png" alt="" />}
                                                                            {items.activityStatus === 2 && <img src="http://image.fosunholiday.com/app/3.0/recommend/ongoing.png" alt="" />}
                                                                            {items.activityStatus === 3 && <img src="http://image.fosunholiday.com/app/3.0/recommend/complete.png" alt="" />}
                                                                            <div className="content">
                                                                                <p>{items.activityName}</p>
                                                                                <p>{items.activityDestription}</p>
                                                                            </div>
                                                                        </div>
                                                                        {items.activityStatus === 1 && <p>未开始</p>}
                                                                        {items.activityStatus === 2 && <p style={{ color: "#f5a623" }}>进行中</p>}
                                                                        {items.activityStatus === 3 && <p style={{ color: '#7ed321' }}>已完成</p>}
                                                                    </li>
                                                                )
                                                            })
                                                        )}

                                                    </ul>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </li>
                            <li className="frist-lachine receive-tasks">
                                <div className="frist-lachine-right">
                                    <img style={{ width: "40px", marginTop: "0px" }} src="http://image.fosunholiday.com/foliday/H5/recommend/5.png" alt="" />
                                    <div className="content">
                                        <p>推荐产品成功预定一次<span className="icon" onClick={this.goToStartProduct.bind(this)}></span></p>
                                        {this.state.recommend_roduct.taskStatus === 1 && <p>好友成功购买推荐产品，赚订单3%</p>}
                                        {this.state.recommend_roduct.taskStatus === 2 && <p>好友成功购买推荐产品，赚订单3%</p>}
                                        {this.state.recommend_roduct.prizeStatus === 1 && this.state.recommend_roduct.taskStatus === 3 ? <p><img src={accountEntry} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />奖励金待入账</p> : null}
                                        {this.state.recommend_roduct.prizeStatus === 2 && this.state.recommend_roduct.taskStatus === 3 ? <p style={{ color: "#f6a827" }}><img src={complete} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />奖励金已发放</p> : null}
                                        {this.state.recommend_roduct.prizeStatus === 3 && this.state.recommend_roduct.taskStatus === 3 ? <p style={{ color: "#d0021b" }}><img src={problem} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />奖励金取消</p> : null}
                                    </div>
                                </div>
                                {this.state.recommend_roduct.taskStatus !== 2 && <span onClick={this.goToStartProduct.bind(this)}>我要推荐</span>}
                                {this.state.recommend_roduct.taskStatus === 2 && <span onClick={this.goToStartProduct.bind(this)}>进行中</span>}
                            </li>
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
                            <p>推荐一下产品获取3%奖励金</p>
                        </div>
                        <p>
                            <span onClick={this.goToStartProduct.bind(this)}>更多产品</span>
                        </p>
                    </div>
                    <ul>
                        {
                            this.state.product_data.map(item => {
                                return (
                                    <li className="innisfree-lis" key={item.productId} onClick={this.goProductList.bind(this, item.productId)}>
                                        <p className="substance" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTittle}</p>
                                        <p className="amount">
                                            <span className="num">&yen;{item.productPrice}</span>
                                            <span>起</span>
                                            {/* <span className="num">{item.productPrize}</span>
                                            <span>奖励金</span> */}
                                        </p>
                                        <p className="immediately" onClick={this.fnFooterClose.bind(this, item)} >立刻推荐</p>
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
