import { ListView } from 'antd-mobile';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { productList } from '@/pages/api/product';
import "./index.css";
import hostConfig from '@/hostConfig'
import Dialog from "@/components/Dialog";
import { shareUrl } from '@/pages/api/homePage'
import { Prius } from 'foliday-bridge';
import { fnCanvas, startProductCanvas } from '@/utils/util'
import welfareIcon from '@/pages/assets/imgs/icon_coupon_welfare.png'

@connect((state, props) => Object.assign({}, props, state), {})
class StarProducts extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({  //这个dataSource有cloneWithRows方法
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.refCanvas = React.createRef();
        this.fnCanvas = fnCanvas.bind(this)
        this.startProductCanvas = startProductCanvas.bind(this)
        this.state = {
            pageNo: 1, // 页码
            pageSize: 10, // 每页数据数
            dataSource, // 请求的到的数据
            isLoading: true, // 是否在加载状态
            height: document.documentElement.clientHeight,
            hasMore: false, // 数据是否加载完毕
            QR_code: "",// 
            canvasImg: "",// canvas刻画得到的图片
            showDialog: false, // 是否显示弹框
        };
    }

    async componentDidMount() {
        document.body.style.width = '100vw';
        document.body.style.overflow = 'hidden';
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height: hei,
        });
        try {
            this.getProduct()
        } catch (e) {

        }
    }
    // 获取明星列表数据
    async getProduct() {
        try {
            let dataSource = await productList({
                "pageNo": this.state.pageNo,
                "pageSize": this.state.pageSize,
            })
            let { result, totalResults } = dataSource
            result = result || []
            this.arr = [...(this.arr || []), ...result]
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.arr),
                isLoading: false,
            })
            if (totalResults <= this.state.dataSource.rowIdentities[0].length) {
                this.setState({
                    hasMore: true
                })
                return
            }
        }
        catch (e) {

        }
    }
    async getShareUrl(item) {
        try {
            let share_url = await shareUrl({
                url: `${hostConfig.mBase}product?productId=${item.productId}`,
                mode: 5,
            })

            let code_data = await shareUrl({
                url: `${hostConfig.mBase}product?productId=${item.productId}`,
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
    // 创建二维码分享链接
    async getQrCode(item) {
        let url = this.props.user.userInfo.iconurl
        if (url) {
            url = url.indexOf('http:') > -1 ? url : hostConfig.apiBase + '/' + url
        } else {
            url = 'https://foliday-img.oss-cn-shanghai.aliyuncs.com/fuyoujian/head_defult.png'
        }
        try {
            let code_data = await shareUrl({
                url: hostConfig.mBase + "product?productId=" + item.productId,
                mode: 0,
            })
            this.setState({
                QR_code: code_data.shareUrl,
            })
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

    onEndReached = (event) => {
        //如果this.state.hasMore为false，说明没数据了，直接返回
        // console.log(this.state.isLoading && this.state.hasMore)
        if (this.state.hasMore) {
            return;
        }
        // console.log('reach end', event);
        this.setState({
            pageNo: this.state.pageNo + 1,
            isLoading: true
        })
        this.getProduct()
    };

    render() {
        //这里就是个渲染数据，rowData就是每次过来的那一批数据，已经自动给你遍历好了，rouID可以作为key值使用，直接渲染数据即可
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="innisfree-list" key={rowData.productId} style={{ margin: "15px 15px 0", border: "1px solid #ebebeb", borderRadius: "20px", overflow: "hidden", padding: "0", position: "relative" }} onClick={this.goProductList.bind(this, rowData.productId)}>
                    <div className="img">
                        <img src={rowData.productImgUrl} alt="" style={{ width: "100%", height: "auto", position: "relative" }} />
                    </div>
                    <p className="substance" style={{ color: "#000000", fontSize: "14px", marginTop: "5px", marginBottom: "7px", padding: "0 10px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: "2" }}>{rowData.productSubTittle}</p>
                    <p className="amount" style={{ fontSize: "14px", padding: "0 10px" }}>
                        <span className="yen" style={{ fontSize: "14px", color: "#f5a623" }}>&yen;</span>
                        <span className="num" style={{ fontSize: "18px", color: "#f5a623" }}>{rowData.productPrice}</span>
                        <span>起</span>
                    </p>
                    <p className="immediately" style={{ position: "absolute", bottom: "0", right: "0", padding: "5px 10px", backgroundColor: "#f0ede9", borderRadius: "20px 0 0 0", color: "#7d530e", fontSize: "14px" }} onClick={this.fnFooterClose.bind(this, rowData)}>立刻推荐</p>
                </div>
            );
        };
        return (
            <div>
                {
                    (this.state.showDialog && this.state.QR_code) ? (
                        <Dialog footer_close={this.fnFooterClose.bind(this)}>
                            {this.state.canvasImg}
                        </Dialog>
                    ) : ''
                }
                <canvas ref={this.refCanvas} id="aa" width="320px" height="568px" style={{ display: 'none', position: 'absolute', zIndex: -1 }}></canvas>
                <div style={{ fontSize: "16px", textAlign: "center" }} >明星产品</div>
                <ListView
                    key={'1'}
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={
                        () => (
                            <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                {this.state.isLoading ? '' : '-----到底啦，只有这些内容了-----'}
                            </div>
                        )
                    }
                    renderRow={row}   //渲染你上边写好的那个row
                    style={{
                        height: this.state.height,
                        padding: '0',
                    }}
                    onEndReached={this.onEndReached}
                    pageSize={this.state.pageSize}    //每次下拉之后显示的数据条数
                />
            </div>
        );
    }

}
export default StarProducts