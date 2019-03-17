import * as React from 'react'
import { Component } from 'react'
import './TopBar.scss'
import logo from '@assets/logo.png'
import { connect } from 'react-redux'
import Auth from '@components/Auth/Auth'
import { displayAuth } from '@store/actions/auth'
import { AuthTab } from '@config'
class TopBar extends Component {
    state = {
        userinfo: null
    }
    props
    constructor(props: any) {
        super(props)
        this.state.userinfo = props.userinfo
    }
    login() {
        this.props.displayAuth(true, AuthTab.LOGIN)
    }
    register() {
        this.props.displayAuth(true, AuthTab.REGISTER)
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
                            <div className="item-text" onClick={()=>this.login()}>    
                                登录
                            </div>
                        </div>
                        <div>
                            |
                        </div>
                        <div className="item" onClick={()=>this.register()}>
                            注册
                        </div>
                    </div>
                </div>
                {
                    (() => {    
                        if(this.props.isDisplay) {
                            return (<Auth></Auth>)
                        }
                    })()
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { isDisplay } = state.auth
    return {
        isDisplay: isDisplay
    }
}
const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab))
})
export default connect(mapStateToProps, mapDispatchToProps)(TopBar)