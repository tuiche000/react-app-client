import React, { Component } from 'react';
import "./index.css"

class Details extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      list_data: []
    }
  }

  componentDidMount() {
    let list_data = [
      {
        id: 1,
        title: '马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票1',
        price: 6600,
        price2: 200
      },
      {
        id: 2,
        title: '马尔代夫卡尼岛Club Med度假村高级会所2晚豪华水屋，送往返机票2',
        price: 3333,
        price2: 200
      }
    ]
    this.setState({
      list_data
    })
  }

  fnGoto() {
    console.log('fnGoto')
    this.props.history.push(
      '/'
    )
  }

  render() {
    return (
      <div className="details ">
        <section class="income">
          <ul>
            <li>
              <div class="substance clearfix">
                <div class="substance-left">
                  <p>推荐奖励</p>
                  <p>
                    <span>2019-12-77</span>
                    <span>09-00</span>
                  </p>
                </div>
                <div class="substance-right"><span>+</span><span>60.</span><span>00</span><span class="icon"></span></div>
              </div>
              <div class="drop-down clearfix">
                <p class="orderID">
                  <span>订单ID</span>
                  <span>1246464654653</span>
                </p>
                <p class="replacement">
                  <span>奖励发放</span>
                  <span>60.00</span>
                </p>
              </div>
            </li>
            <li>
              <div class="substance clearfix">
                <div class="substance-left">
                  <p>推荐奖励</p>
                  <p>
                    <span>2019-12-77</span>
                    <span>09-00</span>
                  </p>
                </div>
                <div class="substance-right"><span>+</span><span>60.</span><span>00</span><span class="icon"></span></div>
              </div>
              <div class="drop-down clearfix">
                <p class="orderID">
                  <span>订单ID</span>
                  <span>1246464654653</span>
                </p>
                <p class="replacement">
                  <span>补发奖励</span>
                  <span>60.00</span>
                </p>
              </div>
            </li>
            <li>
              <div class="substance clearfix">
                <div class="substance-left">
                  <p>推荐奖励</p>
                  <p>
                    <span>2019-12-77</span>
                    <span>09-00</span>
                  </p>
                </div>
                <div class="substance-right"><span>+</span><span>60.</span><span>00</span><span class="icon"></span></div>
              </div>
              <div class="drop-down clearfix">
                <p class="orderID">
                  <span>订单ID</span>
                  <span>1246464654653</span>
                </p>
                <p class="replacement">
                  <span>奖励放还</span>
                  <span>60.00</span>
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Details