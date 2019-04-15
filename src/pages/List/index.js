import React, { Component } from 'react';
import "./index.css"
import { Button } from 'antd-mobile';

class List extends Component {
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
            <div className="innisfree ">
            <Button onClick={this.fnGoto.bind(this)}>default</Button>
                <ul>
                    {
                        this.state.list_data.map(item => {
                            return (
                                <li className="innisfree-lis" key={item.id} onClick={this.fnGoto.bind(this)}>
                                    <div className="img"></div>
                                    <p className="substance">{item.title}</p>
                                    <p className="amount">
                                        <span className="yen">&yen;</span>
                                        <span className="num">{item.price}</span>
                                        <span>起</span>
                                        <span className="num">{item.price2}</span>
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

export default List