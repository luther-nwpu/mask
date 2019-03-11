import * as React from 'react'
import { Component } from 'react'
import './TopBar.scss'
import logo from '@assets/logo.png'
import { connect } from 'react-redux'
import { Auth } from '@components'
class TopBar extends Component {
    state = {
        userinfo: null
    }
    props
    constructor(props: any) {
        super(props)
        this.state.userinfo = props.userinfo
    }
    render() {
        return (
            <div className="topbar">
                <div className="topbar-content">
                    <div className="left">
                        <a href ="/"> <img src={logo} /> </a>
                        <div className="dropitem">
                            <div className="item">
                                首页
                                {/* {JSON.stringify(this.props.userinfo)} */}
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="item">
                                <div> 分类 </div>
                                <span className="closeBox" >
                                </span>
                            </div>
                            <div className="dropitem-content">
                                    HelloWorld
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="item">
                                热门
                                <span className="closeBox" >
                                </span>
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="item">
                                排行榜
                                <span className="closeBox">
                                </span>
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="input">
                                <input type = "text" />
                                <div className="icon">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item">
                            <div className="icon">
                            </div>
                            <div className="item-text">
                                历史
                            </div>
                        </div>
                        <div className="item">
                            <div className="icon-account">
                            </div>
                            <div className="item-text">    
                                登录
                            </div>
                        </div>
                        <div>
                            |
                        </div>
                        <div className="item">
                            注册
                        </div>
                    </div>
                </div>
                {/* <Auth></Auth> */}
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { userinfo } = state.todoApp
    console.log(state.todoApp)
    return {
        userinfo: userinfo
    }
}
export default connect(mapStateToProps)(TopBar)