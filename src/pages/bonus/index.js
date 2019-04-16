import React, { Component } from 'react';
import "./index.css"

class Bonus extends Component {
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

            </div>
        );
    }
}

export default Bonus