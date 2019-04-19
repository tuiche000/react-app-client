import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

import './Dialog.css';

// 参数：
// title=>标题
// shadow=>是否显示背景阴影
// footer_close=>关闭事件
class Dialog extends Component {
    constructor(...args) {
        super(...args);
        document.querySelector('body').style = "height: "+ document.documentElement.clientHeight+"px;overflow: hidden;"
    }

    componentWillUnmount() {
        document.querySelector('body').style = ""
    }

    fnClose() {
        this.props.footer_close && this.props.footer_close();
    }

    render() {
        return (
            <div id="am-modal-container-1555394829792">
                <div>
                    <div className="am-modal-mask"></div>
                    <div className="am-modal-wrap " role="dialog" aria-labelledby="推荐产品成功">
                        <div role="document" className="am-modal am-modal-transparent">
                            <div className="am-modal-content">
                                <div className="am-modal-header">
                                    <div className="am-modal-title">
                                        {this.props.title}
                                    </div>
                                </div>
                                <div className="am-modal-body">
                                    <div className="am-modal-alert-content">
                                        {
                                            this.props.children
                                        }
                                    </div>
                                </div>
                                <div className="am-modal-footer-close">
                                    <Icon onClick={this.fnClose.bind(this)} className="am-modal-footer-close-icon" type="cross-circle" size="" color="#fff" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog;
