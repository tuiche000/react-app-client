import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon } from 'antd-mobile'
import { income, spending } from '../api/account'

class Details extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      income_data: [],
      tabs: [
        { title: '收入' },
        { title: '支出' },
        // { title: '待入' },
      ]
    }
  }

  async componentDidMount() {
    let income_data = await income('ACN0gjHRNvIvUOx', {
      "pageNo": 1,
      "pageSize": 10,
    })
    let { result } = income_data;
    result.forEach((item, index) => {
      item.active = false
      item.id = index
    })
    this.setState({
      income_data: result
    })
  }

  active(e) {
    console.log(e)
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

  render() {
    return (
      <div className="details ">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#f5a623" />}
          onLeftClick={() => window.history.go(-1)}
        ><span style={{ fontSize: "14px" }}>收支明细</span></NavBar>
        <Tabs tabs={this.state.tabs} initialPage={0} tabBarActiveTextColor={'#000000'} tabBarInactiveTextColor={'#999999'} tabBarUnderlineStyle={{ border: '0.5px #ffc147 solid' }}>
          <div>
            <section className="income">
              <ul>
                {
                  this.state.income_data.map((item, index) => {
                    return (
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
                            <span>{item.orderId}</span>
                          </p>
                          <p className="replacement">
                            <span>{item.bous}</span>
                            <span>{item.price}</span>
                          </p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
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