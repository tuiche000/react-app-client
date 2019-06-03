import React, { Component } from 'react';
import "./index.css";
import { PullToRefresh, Toast } from 'antd-mobile';
import { productList } from '@/pages/api/product';
import { create_qrCode } from '@/pages/api/member'
import hostConfig from '@/hostConfig'
import Dialog from "@/components/Dialog";
import { connect } from 'react-redux'
import { shareUrl } from '@/pages/api/homePage'
import { Prius } from 'foliday-bridge';
import { fnCanvas, startProductCanvas } from '@/utils/util'
import welfareIcon from '@/pages/assets/imgs/icon_coupon_welfare.png'
import head_defult from '@/pages/assets/imgs/head_defult.png'

@connect((state, props) => Object.assign({}, props, state), {})
class StarProducts extends Component {
    constructor(...args) {
        super(...args)
        this.refCanvas = React.createRef();
        this.fnCanvas = fnCanvas.bind(this)
        this.startProductCanvas = startProductCanvas.bind(this)
        this.state = {
            refreshing: false,
            showDialog: false,
            height: document.documentElement.clientHeight - 50,
            product_data: [], // 明星产品列表数据
            product_pageNo: 1, // 明星产品列表页数
            product_pageSize: 10, // 明星产品列表单页显示数据
            product_finnished: false, // 是否明星产品列表已经加载玩全部数据
            finished: false,
            canvasImg: "", // canvas生成的图片
            iconUrl: '', // 用户头像地址
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
    async getQrCode(item) {

        let url = this.props.user.userInfo.iconurl
        if (url) {
            url = url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
        } else {
            url = head_defult
        }

        try {
            let code_data = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
            this.startProductCanvas({
                productImg: item.productImgUrl,
                iconurl: url,
                // productImg: productImgcc,
                // iconurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/QUHanDV7bcMqfu2cibrN6zs9NhxD2Aw5TGib1KCOI9ibqiafXUkPhXmduAfVe8zJKKT6rfC2bbTg5G1amKEvicwnEUw/132',
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
    async getShareUrl(item) {
        try {
            let share_url = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 5,
            })
            console.log(share_url)
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
                            iconurl: this.state.iconUrl ? this.state.iconUrl : "https://foliday-img.oss-cn-shanghai.aliyuncs.com/fuyoujian/head_defult.png",
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
        this.getIconurl()
        // 将页面滑动到顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0
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
            window.location.href = `${hostConfig.mBase}product?productId=${productId}`
        }
    }
    render() {
        return (
            <div className="innisfree ">
                {
                    (this.state.showDialog && this.state.QR_code) ? (
                        <Dialog footer_close={this.fnFooterClose.bind(this)}>
                            {this.state.canvasImg}
                        </Dialog>
                    ) : ''
                }
                <canvas ref={this.refCanvas} id="aa" width="320px" height="568px" style={{ display: 'none', position: 'absolute', zIndex: -1 }}></canvas>
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
                    {/* <ul > */}
                        {
                            this.state.product_data.map(item => {
                                return (
                                    <div className="innisfree-list" key={item.productId} onClick={this.goProductList.bind(this, item.productId)}>
                                        <div className="img">
                                            <img src={item.productImgUrl} alt="" />
                                        </div>
                                        <p className="substance" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTittle}</p>
                                        <p className="amount">
                                            <span className="yen">&yen;</span>
                                            <span className="num">{item.productPrice}</span>
                                            <span>起</span>
                                        </p>
                                        <div style={{ position: "relative" }}>
                                            <p className="immediately" onClick={this.fnFooterClose.bind(this, item)}>立刻推荐</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {(this.state.product_data.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
                    {/* </ul> */}
                </PullToRefresh>
            </div>
        );
    }
}

// @connect(mapStateToProps, mapDispatchToProps)
export default StarProducts