import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon, Toast, PullToRefresh } from 'antd-mobile'
import { recommendList, lachineList } from '@/pages/api/lachineProduct'
import { connect } from 'react-redux'
import accountEntry from '@/pages/assets/imgs/accountEntry.png'
import complete from '@/pages/assets/imgs/complete.png'
import problem from '@/pages/assets/imgs/problem.png'

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
                { title: '产品推荐' },
                { title: '拉新会员' },
            ],
            initialPage: Number(this.props.history.location.search.split("=")[1]) || 0, // 切换tab栏,
            lachine_pageNo: 1, // 拉新列表页数
            lachine_pageSize: 10, // 拉新列表单页显示数据量
            lachine_finished: false, // 拉新列表是否加载全部数据 
            recommend_pageNo: 1, // 产品列表页数
            finished: false,
            recommend_pageSize: 10, // 产品列表单页显示数据量
            recommend_finished: false, // 产品列表是否加载全部数据
        }
    }
    async componentDidMount() {
        try {
            await this.getLachineList()
            await this.getRecommendList()
            this.setState({
                finished: true,
            })
        } catch (e) {
            alert(JSON.stringify(e))
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
            // console.log(err)
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
            // 拉新会员加载更多
            case 0:
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
            // 产品推荐加载更多
            case 1:
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
                                                            <p className="characters-describe" style={{ WebkitBoxOrient: "vertical" }}>{item.productSubTitle}</p>
                                                            <p className="characters-time">
                                                                <span>推荐时间</span>
                                                                <span>{item.recommendDate}</span>
                                                                <span></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="product-bottom">
                                                        {
                                                            item.status === 1 && <span className="bonus-pending"><img src={accountEntry} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />奖励金待发放</span>
                                                        }
                                                        {
                                                            item.status === 2 && <span className="bonus-issued"><img src={complete} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />奖励金已发放</span>
                                                        }
                                                        {
                                                            item.status === 3 && <span className="bonus-fail"><img src={problem} alt="" style={{ width: "17px", marginRight: "5px", marginTop: "2px" }} />审核失败 奖励金 {item.prize} 取消发放</span>
                                                        }
                                                        <span className="icon" onClick={this.goToDetails.bind(this)}></span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                        {(this.state.recommend_list.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
                                    </ul>
                                </PullToRefresh>
                            </section>
                        </div>
                        <div>
                            <section className="lachine" >
                                <PullToRefresh
                                    damping={100}
                                    ref={el => this.ptra = el}
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
                                                    <div className="picture"><img src={item.productImage} alt="" /></div>
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
                                        {(this.state.Lachine_list.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
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