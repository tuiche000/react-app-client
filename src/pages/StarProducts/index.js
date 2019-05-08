import React, { Component } from 'react';
import "./index.css";
import { PullToRefresh, Toast } from 'antd-mobile';
import { productList } from '@/pages/api/product';
import { create_qrCode } from '@/pages/api/member'
import hostConfig from '@/hostConfig'
import Dialog from "@/components/Dialog";
import { connect } from 'react-redux'
import { shareUrl } from '@/pages/api/homePage'
import { Prius } from 'foliday-bridge'

@connect((state, props) => Object.assign({}, props, state), {})
class StarProducts extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            refreshing: false,
            showDialog: false,
            height: document.documentElement.clientHeight - 55,
            product_data: [], // 明星产品列表数据
            product_pageNo: 1, // 明星产品列表页数
            product_pageSize: 5, // 明星产品列表单页显示数据
            product_finnished: false, // 是否明星产品列表已经加载玩全部数据
            finished: false,
        }
    }
    // 获取明星列表数据
    async getProduct() {
        try {
            let product_data = await productList({
                "pageNo": this.state.product_pageNo,
                "pageSize": this.state.product_pageSize,
            })
            let { result, totalResults } = product_data
            result = result || []
            this.setState({
                product_data: [...this.state.product_data, ...result],
                refreshing: false,
            })
            if (totalResults <= this.state.product_data.length) {
                this.setState({
                    product_finnished: true
                })
                return
            }
        }
        catch (e) {

        }
    }
    // 根据手机号创建二维码分享链接
    async create_qrCode(phone) {
        try {
            let code_data = await create_qrCode(phone)
            let { qrUrl } = code_data
            this.setState({
                QR_code: qrUrl,
            })
        }
        catch (e) {

        }
    }
    // 创建二维码分享链接
    async getQrCode(productId) {
        try {
            let code_data = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
        }
        catch (e) {

        }
    }
    async getShareUrl(item) {
        try {
            let share_url = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 5,
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
                    url: share_url.shareUrl,
                    description: item.productSubTittle,
                    iconUrl: "http:" + item.productImgUrl,
                },
                listener: function (data) {
                    // console.log(JSON.stringify(data))
                }
            })
        }
        catch (e) {

        }
    }
    async componentDidMount() {
        try {
            await this.getProduct()
            this.setState({
                finished: true,
            })
        } catch (e) {
            // console.log(e)
        }
        // 将页面滑动到顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    fnFooterClose(item = {}, e) {
        e && e.stopPropagation();
        e && e.nativeEvent.stopImmediatePropagation();
        if (window.Prius.isInsideApp) {
            this.getShareUrl(item)
        } else {
            this.getQrCode(item.productId)
        }
        this.setState({
            showDialog: !this.state.showDialog
        })
    }
    onRefresh = () => {

        this.setState({ refreshing: true });
        if (this.state.product_finnished) {
            Toast.info('数据已经加载完毕', 1);
            this.setState({ refreshing: false });
            return
        }
        this.setState({
            product_pageNo: this.state.product_pageNo + 1
        })
        this.getProduct()
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
                    // console.log(JSON.stringify(data))
                }
            })
        } else {
            window.location.href = hostConfig.mBase + "product?productId=" + productId
        }
    }
    render() {
        return (
            <div className="innisfree ">
                {
                    (this.state.showDialog && this.state.QR_code) ? (
                        <Dialog title="长按图片保存" footer_close={this.fnFooterClose.bind(this)}>
                            <img src={this.state.QR_code} alt="" />
                        </Dialog>
                    ) : ''
                }
                {/* <NavBar
                    mode="light"
                    icon={this.props.other.isInsideApp ? "" : <Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                ><span style={{ fontSize: "16px" }}>明星产品</span></NavBar> */}
                <div style={{ fontSize: "16px", textAlign: "center" }} >明星产品</div>
                <PullToRefresh
                    damping={100}
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    direction="up"
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                >
                    <ul>
                        {
                            this.state.product_data.map(item => {
                                return (
                                    <li className="innisfree-list" key={item.productId} onClick={this.goProductList.bind(this, item.productId)}>
                                        <div className="img">
                                            <img src={item.productImgUrl} alt="" />
                                        </div>
                                        <p className="substance" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTittle}</p>
                                        <p className="amount">
                                            <span className="yen">&yen;</span>
                                            <span className="num">{item.productPrice}</span>
                                            <span>起</span>
                                            {/* <span className="num">{item.productPrize}</span>
                                            <span>奖励金</span> */}
                                        </p>
                                        <p className="immediately" onClick={this.fnFooterClose.bind(this, item)}>立刻推荐</p>
                                    </li>
                                )
                            })
                        }
                        {(this.state.product_data.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
                    </ul>
                </PullToRefresh>
            </div>
        );
    }
}

// @connect(mapStateToProps, mapDispatchToProps)
export default StarProducts