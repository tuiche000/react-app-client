import React from 'react'
import { Route } from 'react-router-dom'
import Routes from './routes'
import { Icon } from 'antd-mobile'
import hostConfig from '@/hostConfig'
import { connect } from 'react-redux'

@connect((state, props) => Object.assign({}, props, state), {
})
class Layout extends React.Component {
    // constructor(...args) {
    //     super(...args)
    // }
    fnBack() {
        if (window.location.hash === "#/fyRcommend/" || window.location.hash === "#/") {
            window.location.href = hostConfig.mBase
            return
        }
        window.history.back()
    }
    render = () => {
        const style = this.props.other.notLayout ? { display: 'none' } : null
        return (
            <div style={style}>
                <header>
                    {this.props.other.isInsideApp ? null : <Icon type="left" color="#f5a623" style={{ marginLeft: "15px", marginTop: "15px" }} onClick={this.fnBack} />}
                </header>
                <div>
                    {
                        Routes.map((item, index) => {
                            if (!item.notLayout) {
                                return (
                                    <Route key={index} path={item.path} exact component={item.component} />
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </div>
                {/* <button onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }}>推出登陆</button> */}
                <footer style={{ height: "50px" }}></footer>
            </div>
        )
    }
}

export default Layout