import React, { Component } from 'react';
import "./index.css";
import { NavBar, Icon } from 'antd-mobile';
import { productList } from '../api/product';

class StarProducts extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            product_data: [], // 明星产品列表数据
            productPageNo: 1, // 明星产品列表页数
            productPageSize: 2, // 明星产品列表单页显示数据
        }
    }
    async getProduct() {
        let product_data = await productList({
            "pageNo": this.state.productPageNo,
            "pageSize": this.state.productPageSize,
        })
        let { result } = product_data
        this.setState({
            product_data: result || [],
        })
    }

    async componentDidMount() {
        try {
            this.getProduct()
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="innisfree ">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#f5a623" />}
                    onLeftClick={() => window.history.go(-1)}
                ><span style={{ fontSize: "16px" }}>明星产品</span></NavBar>
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
            </div>
        );
    }
}

export default StarProducts