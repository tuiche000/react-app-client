import React, { Component } from 'react';
import "./index.css";
import { NavBar, Icon, PullToRefresh, Toast } from 'antd-mobile';
import { productList } from '@/pages/api/product';
// import { connect } from 'react-redux'

class StarProducts extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            refreshing: false,
            height: document.documentElement.clientHeight,
            product_data: [], // 明星产品列表数据
            product_pageNo: 1, // 明星产品列表页数
            product_pageSize: 2, // 明星产品列表单页显示数据
            product_finnished: false, // 是否明星产品列表已经加载玩全部数据
        }
    }
    async getProduct() {
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

    async componentDidMount() {
        try {
            this.getProduct()
        } catch (e) {
            console.log(e)
        }
        // 将页面滑动到顶部
        document.body.scrollTop = document.documentElement.scrollTop = 0
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
    render() {
        return (
            <div className="innisfree ">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                ><span style={{ fontSize: "16px" }}>明星产品</span></NavBar>
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
                                    <li className="innisfree-list" key={item.productId} >
                                        <div className="img">
                                            <img src={item.productImgUrl} alt="" />
                                        </div>
                                        <p className="substance" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTittle}</p>
                                        <p className="amount">
                                            <span className="yen">&yen;</span>
                                            <span className="num">{item.productPrice}</span>
                                            <span>起</span>
                                            <span className="num">{item.productType}</span>
                                            <span>奖励金</span>
                                        </p>
                                        <p className="immediately">立刻推荐</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </PullToRefresh>
            </div>
        );
    }
}

// @connect(mapStateToProps, mapDispatchToProps)
export default StarProducts