import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon, PullToRefresh } from 'antd-mobile'
import { income, spending } from '@/pages/api/account'
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import { reCount } from '@/pages/api/homePage'

@connect((state, props) => Object.assign({}, props, state), {
})
class Details extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight - 55,
      income_data: [], // 收入列表
      spending_data: [],//支出列表
      tabs: [ // tabs名称 
        { title: '收入' },
        { title: '支出' },
        // { title: '待入' },
      ],
      initialPage: 0,
      income_pageNo: 1, //收入列表页数
      income_pageSize: 10, //收入列表单页显示数据
      income_finished: false, // 是否收入列表已经加载全部数据了
      finished: false,
      spending_pageNo: 1, //支出列表页数
      spending_pageSize: 10, //支出列表单页显示数据
      spending_finished: false, // 是否支出列表已经加载全部数据了
      code: '', // 用户code
    }
  }
  async getReConut() {
    try {
      let Recount = await reCount()
      let { code } = Recount
      this.setState({
        code,
      })
      await this.getIncome()
      await this.getSpending()
      this.setState({
        finished: true,
      })
    }
    catch (e) {

    }
  }
  // 获取收入列表
  async getIncome() {
    try {
      let income_data = await income(this.state.code, {
        "pageNo": this.state.income_pageNo,
        "pageSize": this.state.income_pageSize,
      })
      let { result, totalResults } = income_data
      result.forEach((item) => {
        item.active = false
      })
      this.setState({
        income_data: [...this.state.income_data, ...result],
        refreshing: false
      })
      if (totalResults <= this.state.income_data.length) {
        this.setState({
          income_finished: true
        })
        return
      }
    }
    catch (e) {
      // console.log(e)
    }
  }

  // 获取支出列表
  async getSpending() {
    try {
      let spending_data = await spending(this.state.code, {
        "pageNo": this.state.spending_pageNo,
        "pageSize": this.state.spending_pageSize,
      })
      let spending_result = spending_data.result
      let spending_totalResults = spending_data.totalResults
      spending_result.forEach((item) => {
        item.active = false
      })
      this.setState({
        spending_data: [...this.state.spending_data, ...spending_result],
        refreshing: false
      })
      if (spending_totalResults <= this.state.spending_data.length) {
        this.setState({
          spending_finished: true
        })
        return
      }
    }
    catch (e) {
      // console.log(e)
    }
  }

  async componentDidMount() {
    try {
      this.getReConut()
    } catch (e) {
      // console.log(e)
    }
  }

  // tabs切换函数
  onTabsChange = (tab, index) => {
    this.setState({
      initialPage: index
    })
  }

  // （收入）切换箭头，显示更多？
  active(e) {
    let cur = this.state.income_data.map(item => {
      if (item.id === e) {
        item.active = !item.active
      }
      return item
    })
    this.setState({
      income_data: cur
    })
  }

  // （支出）切换箭头，显示更多？
  spending_active(e) {
    let cur = this.state.spending_data.map(item => {
      if (item.id === e) {
        item.active = !item.active
      }
      return item
    })
    this.setState({
      spending_data: cur
    })
  }
  // 上拉加载更多
  onRefresh = () => {
    this.setState({ refreshing: true });
    switch (this.state.initialPage) {
      // 收入上拉加载更多
      case 0:
        if (this.state.income_finished) {
          Toast.info('数据已经加载完毕', 1);
          this.setState({ refreshing: false });
          break;
        }
        this.setState({
          income_pageNo: this.state.income_pageNo + 1
        })
        this.getIncome()
        break;
      // 支出上拉加载更多
      case 1:
        if (this.state.spending_finished) {
          Toast.info('数据已经加载完毕', 1);
          this.setState({ refreshing: false });
          break;
        }
        this.setState({
          spending_pageNo: this.state.spending_pageNo + 1
        })
        this.getSpending()
        break;
      default:
        this.setState({ refreshing: false });
      //
    }
  }

  render() {
    return (
      <div className="details ">
        <NavBar
          mode="light"
          icon={this.props.other.isInsideApp ? "" : <Icon type="left" color="#f5a623" />}
          onLeftClick={() => window.history.go(-1)}
        ><span style={{ fontSize: "14px" }}>收支明细</span></NavBar>
        <Tabs tabs={this.state.tabs} initialPage={this.state.initialPage} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }} onChange={this.onTabsChange}>
          <div>
            <section className="income">
              <PullToRefresh
                damping={100}
                ref={el => this.ptr = el}
                style={{
                  minHeight: this.state.height,
                  overflow: 'auto',
                }}
                direction="up"
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              >
                <ul>
                  {this.state.income_data.map(item => (
                    <li key={item.id}>
                      <div className="substance clearfix">
                        <div className="substance-left">
                          <p>{item.typeName}</p>
                          <p>
                            <span>{item.createDate}</span>
                          </p>
                        </div>
                        <div className="substance-right"><span>+</span><span>{item.point}</span><span></span><span style={{ display: "none" }} className={`icon ${(item.active === true ? 'frameActive' : null)} ${(item.id ? '' : 'hide')} `} onClick={this.active.bind(this, item.id)}></span></div>
                      </div>

                      {/*  下拉气泡 */}
                      {/* <div className={`drop-down clearfix ${(item.active === true ? 'divDeviation' : '')} ${(item.id ? '' : 'hide')}`} >
                        <p className="orderID">
                          <span>订单ID</span>
                          <span>{item.id}</span>
                        </p>
                        <p className="replacement">
                          <span>{item.typeName}</span>
                          <span>{item.point}</span>
                        </p>
                      </div> */}
                    </li>
                  ))}
                  {(this.state.income_data.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
                </ul>
              </PullToRefresh>
            </section>
          </div>
          <div>
            <section className="income expenditure">
              <PullToRefresh
                damping={100}
                ref={el => this.ptr = el}
                style={{
                  minHeight: this.state.height,
                  overflow: 'auto',
                }}
                direction="up"
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              >
                <ul>
                  {
                    this.state.spending_data.map((item) => {
                      return (
                        <li key={item.id}>
                          <div className="substance clearfix">
                            <div className="substance-left">
                              <p>{item.typeName}</p>
                              <p>
                                <span>{item.createDate}</span>
                              </p>
                            </div>
                            <div className="substance-right"><span></span><span>{item.point}</span><span></span><span style={{ display: "none" }} className={`icon  ${(item.active === true ? 'frameActive' : null)} ${(item.id ? '' : 'hide')}`} onClick={this.spending_active.bind(this, item.id)}></span></div>
                          </div>
                          {/* 下拉气泡 */}
                          {/* <div className={`drop-down clearfix ${(item.active === true ? 'divDeviation' : '')} ${(item.id ? '' : 'hide')} `}>
                            <p className="orderID">
                              <span>订单ID</span>
                              <span>{item.id}</span>
                            </p>
                            <p className="replacement">
                              <span>奖励抵扣</span>
                              <span>{item.point}</span>
                            </p>
                          </div> */}
                        </li>
                      )
                    })
                  }
                  {(this.state.spending_data.length === 0 && this.state.finished) && <div style={{ textAlign: 'center' }}><img src="http://image.fosunholiday.com/h5/default/KONG.png" alt="" style={{ width: "40%", paddingTop: "20px" }} /><p style={{ paddingTop: "20px" }}>—暂无相关内容—</p></div>}
                </ul>
              </PullToRefresh>
            </section>
          </div>
          {/* <div>
            <section className="income stayIn">
              <ul>
                <li>
                  <div className="substance clearfix">
                    <div className="substance-left">
                      <p>推荐奖励</p>
                      <p>
                        <span>审核中</span>
                      </p>
                    </div>
                    <div className="substance-right"><span>60.</span><span>00</span></div>
                  </div>
                </li>
              </ul>
            </section>
          </div> */}
        </Tabs>
      </div >
    );
  }
}

export default Details