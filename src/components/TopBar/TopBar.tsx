import * as React from 'react'
import { Component } from 'react'
import './TopBar.scss'
import logo from '@assets/logo.png'
import { connect } from 'react-redux'
import Auth from '@components/Auth/Auth'
import { displayAuth } from '@store/actions/auth'
import { AuthTab } from '@config'
import avator_default_jpg from '@assets/avator_default.jpg'
import history from '@router'
import { withCookies, Cookies } from 'react-cookie'
import loginout_svg from '@assets/loginout_btn_0.svg'
import { storeUserInfo } from '@store/actions/todoApp'

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
    _handleToLinkPerson() {
        history.push('/personinfo')
    }
    logout() {
        this.props.storeUserInfo({})
        const { cookies }= this.props
        cookies.remove('Authorization')
        cookies.remove('userinfo')
    }
    render() {
        const userinfo = this.props.userinfo
        console.log('userinfo', userinfo)
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
                        {
                            userinfo && userinfo.email ? (
                                <div className="auth-detail">
                                    <div className="item">
                                        <div className="icon-subscribe">
                                        </div>
                                        <div className="item-text">
                                            订阅
                                        </div>
                                    </div>
                                    <div className="dropitem">
                                        <span className="auth-detail-user" onClick={() => this._handleToLinkPerson()}>    
                                            <img src={ avator_default_jpg } />
                                            <span className="text"> { userinfo.username } </span> 
                                            <span className="closeBox"></span>
                                        </span>
                                        <div className="dropitem-content">
                                            <img className="drop-img" src={ avator_default_jpg } />
                                            <div className="auth-userinfo">
                                                <div className="userinfo-username">
                                                    { userinfo.username }
                                                </div>
                                                <div>
                                                    { userinfo.signature }
                                                </div>
                                            </div>
                                            <span className="loginout" onClick={() => this.logout()}>
                                                <img src={ loginout_svg }/>
                                               <span className="loginout-text"> 退出</span>  </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="auth-item">
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
                            )
                        }
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
    const { userinfo } = state.todoApp
    const { isDisplay } = state.auth
    return {
        isDisplay: isDisplay,
        userinfo: userinfo
    }
}
const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab)),
    storeUserInfo: userinfo => dispatch(storeUserInfo(userinfo))
})
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(TopBar))