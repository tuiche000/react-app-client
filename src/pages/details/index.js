import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon, PullToRefresh } from 'antd-mobile'
import { income, spending } from '../api/account'
import { Toast } from 'antd-mobile';

class Details extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      income_data: [], // 收入列表
      spending_data: [],//支出列表
      tabs: [ // tabs名称 
        { title: '收入' },
        { title: '支出' },
        // { title: '待入' },
      ],
      initialPage: 0,
      income_pageNo: 1, //收入列表页数
      income_pageSize: 5, //收入列表单页显示数据
      spending_pageNo: 1, //支出列表页数
      spending_pageSize: 10, //支出列表单页显示数据
      income_finished: false, // 是否已经加载全部数据了
    }
  }

  // 获取收入列表
  async getIncome() {
    let income_data = await income('ACN0gjHRNvIvUOx', {
      "pageNo": this.state.income_pageNo,
      "pageSize": this.state.income_pageSize,
    })
    let { result, totalResults } = income_data;
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
  
  // 获取支出列表
  async getSpending() {
    let spending_data = await spending("ACN0gjHRNvIvUOx", {
      "pageNo": this.state.spending_pageNo,
      "pageSize": this.state.spending_pageSize,
    })
    // console.log(spending_data)
    let spending_result = spending_data.result
    // console.log(spending_result)
    spending_result.forEach((item) => {
      item.active = false
    })
    this.setState({
      spending_data:spending_result
    })
  }

  async componentDidMount() {
    try {
      // Promise.all(this.getIncome(), this.getIncome()).then(res => {
      //   console.log(res)
      // })
      // new Promise((resolve, reject) => {
      //   Promise.all()
      // })
      this.getIncome()
      this.getSpending()
    } catch (e) {
      console.log(e)
    }

    // try {
    //   this.getSpending()
    // } catch (e) {
    //   console.log(e)
    // }
  }

  // tabs切换函数
  onTabsChange = (tab, index) => {
    this.setState({
      initialPage: index
    })
  }

  // 切换箭头，显示更多？
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

  // 上拉加载更多
  onRefresh = () => {
    this.setState({ refreshing: true });
    switch (this.state.initialPage) {
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
          icon={<Icon type="left" color="#f5a623" />}
          onLeftClick={() => window.history.go(-1)}
        ><span style={{ fontSize: "14px" }}>收支明细</span></NavBar>
        <Tabs tabs={this.state.tabs} initialPage={this.state.initialPage} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }} onChange={this.onTabsChange}>
          <div>
            <section className="income">
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
                  {this.state.income_data.map(item => (
                    <li key={item.id}>
                      <div className="substance clearfix">
                        <div className="substance-left">
                          <p>{item.typeName}</p>
                          <p>
                            <span>{item.createDate}</span>
                          </p>
                        </div>
                        <div className="substance-right"><span>+</span><span>{item.point}</span><span></span><span className={`icon ${(item.active === true ? 'frameActive' : null)}`} onClick={this.active.bind(this, item.id)}></span></div>
                      </div>
                      <div className={`drop-down clearfix ${(item.active === true ? 'divDeviation' : '')}`} >
                        <p className="orderID">
                          <span>订单ID</span>
                          <span>{item.id}</span>
                        </p>
                        <p className="replacement">
                          <span>{item.typeName}</span>
                          <span>{item.point}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </PullToRefresh>
            </section>
          </div>
          <div >
            <section className="income expenditure">
              <ul>
                <li>
                  <div className="substance clearfix">
                    <div className="substance-left">
                      <p>奖励金抵扣</p>
                      <p>
                        <span>2019-12-77</span>
                        <span>09-00</span>
                      </p>
                    </div>
                    <div className="substance-right"><span>-</span><span>60.</span><span>00</span><span className="icon"></span></div>
                  </div>
                  <div className="drop-down clearfix">
                    <p className="orderID">
                      <span>订单ID</span>
                      <span>「</span>
                    </p>
                    <p className="replacement">
                      <span>奖励发放</span>
                      <span>60.00</span>
                    </p>
                  </div>
                </li>
                <li>
                  <div className="substance clearfix">
                    <div className="substance-left">
                      <p>推荐奖励</p>
                      <p>
                        <span>2019-12-77</span>
                        <span>09-00</span>
                      </p>
                    </div>
                    <div className="substance-right"><span>+</span><span>60.</span><span>00</span><span className="icon"></span></div>
                  </div>
                  <div className="drop-down clearfix">
                    <p className="orderID">
                      <span>订单ID</span>
                      <span>1246464654653</span>
                    </p>
                    <p className="replacement">
                      <span>补发奖励</span>
                      <span>60.00</span>
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
          <div>
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
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Details