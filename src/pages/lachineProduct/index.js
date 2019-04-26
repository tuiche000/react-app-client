import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon, Toast, PullToRefresh } from 'antd-mobile'
import { lachineList, recommendList } from '@/pages/api/lachineProduct'
import { connect } from 'react-redux'

@connect((state, props) => Object.assign({}, props, state), {
})
class LachineProduct extends Component {
    constructor(...args) {
        super(...args)

        this.state = {
            refreshing: false,
            height: document.documentElement.clientHeight - 55,
            Lachine_list: [], // 拉新列表数据
            recommend_list: [], // 产品列表数据
            tabs: [             // tab栏标题
                { title: '拉新会员' },
                { title: '产品推荐' },
            ],
            initialPage: 0,
            lachine_pageNo: 1, // 拉新列表页数
            lachine_pageSize: 10, // 拉新列表单页显示数据量
            lachine_finished: false, // 拉新列表是否加载全部数据 
            recommend_pageNo: 1, // 产品列表页数
            recommend_pageSize: 10, // 产品列表单页显示数据量
            recommend_finished: false, // 产品列表是否加载全部数据
        }
    }

    // 获取拉新列表
    async getLachineList() {
        try {
            let Lachine_list = await lachineList({
                "pageNo": this.state.lachine_pageNo,
                "pageSize": this.state.lachine_pageSize,
            })
            let { result, totalResults } = Lachine_list
            this.setState({
                Lachine_list: [...this.state.Lachine_list, ...result] || [],
                refreshing: false,
            })
            if (totalResults <= this.state.Lachine_list.length) {
                this.setState({
                    lachine_finished: true,
                })
                return
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // 获取产品推荐列表数据
    async getRecommendList() {
        try {
            let recommend_list = await recommendList({
                "pageNo": this.state.recommend_pageNo,
                "pageSize": this.state.recommend_pageSize,
            })
            let { result } = recommend_list
            let recommend_totalResults = recommend_list.totalResults
            this.setState({
                recommend_list: [...this.state.recommend_list, ...result] || [],
                refreshing: false,
            })
            if (recommend_totalResults <= this.state.recommend_list.length) {
                this.setState({
                    recommend_finished: true,
                })
                return
            }
        }
        catch (e) {

        }
    }

    componentDidMount() {
        try {
            this.getLachineList()
            this.getRecommendList()
        } catch (e) {
            alert(JSON.stringify(e))
        }

    }
    // 跳转奖励金收支明细页面
    goToDetails() {
        this.props.history.push(
            '/details'
        )
    }
    // tabs切换函数
    onTabsChange = (tab, index) => {
        this.setState({
            initialPage: index
        })

    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        switch (this.state.initialPage) {
            // 收入上拉加载更多
            case 0:
                if (this.state.lachine_finished) {
                    Toast.info('数据已经加载完毕', 1);
                    this.setState({ refreshing: false });
                    break;
                }
                this.setState({
                    lachine_pageNo: this.state.lachine_pageNo + 1
                })
                this.getLachineList()
                break;
            // 支出上拉加载更多
            case 1:
                if (this.state.recommend_finished) {
                    Toast.info('数据已经加载完毕', 1);
                    this.setState({ refreshing: false });
                    break;
                }
                this.setState({
                    recommend_pageNo: this.state.recommend_pageNo + 1
                })
                this.getRecommendList()
                break;
            default:
                this.setState({ refreshing: false });
            //
        }
    }

    render() {
        return (
            <div className="main ">
                {
                    this.props.other.isInsideApp ? "" : (
                        <NavBar
                            mode="light"
                            icon={<Icon type="left" color="#f5a623" />}
                            onLeftClick={() => window.history.go(-1)}
                        ></NavBar>
                    )
                }

                <div className="lachineProduct ">
                    <Tabs tabs={this.state.tabs} initialPage={this.state.initialPage} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }} animated={true} useOnPan={true} onChange={this.onTabsChange}>
                        <div>
                            <section className="lachine" >
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
                                        {this.state.Lachine_list.map(item => (
                                            <li key={item.recommendId}>
                                                <div className="lachine-top clearfix">
                                                    <div className="picture"><img src="http://img.fosunholiday.com/img/M00/00/32/Ch0djlri8MuAIUyaAARiSUd-y2o767.jpg" alt="" /></div>
                                                    <div className="characters">
                                                        <p className="characters-telephone">{item.mobile}</p>
                                                        <p className="characters-time">
                                                            <span>推荐时间</span>
                                                            <span>{item.recommendDate}</span>
                                                            <span></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </PullToRefresh>
                            </section>
                        </div>
                        <div>
                            <section className="product" >
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
                                            this.state.recommend_list.map(item => (
                                                <li key={item.recommendId}>
                                                    <div className="product-top clearfix">
                                                        <div className="picture"><img src={item.productImage} alt="" /></div>
                                                        <div className="characters">
                                                            <p className="characters-describe">{item.productSubTitle}</p>
                                                            <p className="characters-time">
                                                                <span>推荐时间</span>
                                                                <span>{item.recommendDate}</span>
                                                                <span></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="product-bottom">
                                                        {
                                                            item.status === 1 && <span className="bonus-pending">奖励金待发放</span>
                                                        }
                                                        {
                                                            item.status === 2 && <span className="bonus-issued">奖励金已发放</span>
                                                        }
                                                        {
                                                            item.status === 3 && <span className="bonus-fail">审核失败 奖励金1.00取消发放</span>
                                                        }
                                                        <span className="icon" onClick={this.goToDetails.bind(this)}></span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {/* <li>
                                        <div className="product-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-describe">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="product-bottom">
                                            <span className="bonus-pending">奖励金待入账</span>
                                            <span className="icon"></span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="product-top clearfix">
                                            <div className="picture"><img src="./imgs/header-portrait.jpg" alt="" /></div>
                                            <div className="characters">
                                                <p className="characters-describe">马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票</p>
                                                <p className="characters-time">
                                                    <span>推荐时间</span>
                                                    <span>2018-12-12</span>
                                                    <span>09:00</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="product-bottom">
                                            <span className="bonus-fail">审核失败 奖励金1.00取消发放</span>
                                            <span className="icon"></span>
                                        </div>
                                    </li> */}
                                    </ul>
                                </PullToRefresh>
                            </section>
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default LachineProduct