import React, { Component } from 'react';
import "./index.css";
import { Tabs, NavBar, Icon } from 'antd-mobile'

class Details extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      income_data: [],
      frameActive: [],
      tabs : [
        { title: '收入' },
        { title: '支出' },
        // { title: '待入' },
      ]
    }
  }

  componentDidMount() {
    let income_data = [
      {
        id: 1,
        orderId: 24366688,
        price: "60.00",
        time: "2019-12-07",
        mtime: '09.00',
        bous: '奖励发放'
      },
      {
        id: 2,
        orderId: 4654651,
        price: "70.00",
        time: "2019-12-15",
        mtime: '10.00',
        bous: '补发奖励'
      },
      {
        id: 3,
        orderId: 54654135,
        price: "100.00",
        time: "2019-12-27",
        mtime: '12.00',
        bous: '奖励放还'
      }
    ];
    let arr = []
    income_data.forEach((item) => {
      arr = [...arr, {
        id: item.id,
        active: false
      }]
    })
    this.setState({
      frameActive: arr,
      income_data,
    })
  }

  active(e) {
    let cur = this.state.frameActive.map(item => {
      if (item.id === e) {
        item.active = !item.active
      }
      return item
    })
    this.setState({
      frameActive: cur
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
                            <p>推荐奖励</p>
                            <p>
                              <span>{item.time}</span>
                              <span>{item.mtime}</span>
                            </p>
                          </div>
                          <div className="substance-right"><span>+</span><span>{item.price}</span><span></span><span className={`icon ${(this.state.frameActive[index].active === true ? 'frameActive' : null)}`} onClick={this.active.bind(this, item.id)}></span></div>
                        </div>
                        <div className={`drop-down clearfix ${(this.state.frameActive[index].active === true ? 'divDeviation' : '')}`} >
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
                      <span>1246464654653</span>
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