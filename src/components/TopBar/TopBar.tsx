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
import woman_svg from '@assets/woman_btn_0.svg'
import man_svg from '@assets/man_btn_0.svg'
import sex_svg from '@assets/sex_know_0.svg'
import autograph from '@assets/icon_autograph.png'
import age from '@assets/icon_age.png'
import location from '@assets/icon_location.png'
import play_svg from '@assets/play_btn_1.svg'
import avator_jpg from '@assets/avator_default.jpg'
import watch_svg from '@assets/watch_btn_0.svg'

class TopBar extends Component {
    state = {
        userinfo: null
    }
    props
    constructor(props: any) {
        super(props)
        this.state.userinfo = props.userinfo
    }
    getRandomColor () {
        return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6)
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
    switchToLink(link) {
        history.push(link)
    }
    render() {
        const userinfo = this.props.userinfo
        return (
            <div className="topbar">
                <div className="topbar-content">
                    <div className="left">
                        <a href ="/"> <img src={logo} /> </a>
                        <div className="dropitem">
                            <div className="item" onClick={() => this.switchToLink('/')}>
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
                                <div className="category">
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        游戏
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        生活
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        娱乐
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        影视
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        音乐
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        科技
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        数码
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        动画
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        时尚
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        番剧
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        纪录片
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        鬼畜
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        广告
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        国创
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        电视剧
                                    </span>
                                    <span className="category-item" style={{background: this.getRandomColor(), color: this.getRandomColor()}} >
                                        电影
                                    </span>
                                </div>     
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="item">
                                热门
                                <span className="closeBox">
                                </span>
                            </div>
                            <div className="dropitem-content">
                                <div className="hot">
                                    <div className="hot-item">
                                        <img src={play_svg} className="play-img"/> <span  style={{color: this.getRandomColor()}}>我喜欢你好久了</span>
                                    </div>
                                    <div className="hot-item">
                                        <img src={play_svg} className="play-img"/> <span  style={{color: this.getRandomColor()}}>我喜欢你好久了</span>
                                    </div>
                                    <div className="hot-item">
                                        <img src={play_svg} className="play-img"/> <span style={{color: this.getRandomColor()}}>我喜欢你好久了</span>
                                    </div>
                                    <div className="hot-item">
                                        <img src={play_svg} className="play-img"/> <span style={{color: this.getRandomColor()}}>我喜欢你好久了</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="item">
                                排行榜
                                <span className="closeBox">
                                </span>
                            </div>
                            <div className="dropitem-content">
                                <div className="board">
                                    <div className="border-item">
                                        <span className="num" style={{ background: this.getRandomColor() }}> 1 </span> <span style={{color: this.getRandomColor()}}>你是我天边最美的云彩。</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropitem">
                            <div className="input">
                                <input type = "text"  placeholder = "好嗨哟，好开心哦"/>
                                <div className="icon">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="dropitem">    
                            <div className="item">
                                <div className="icon">
                            </div>
                                <div className="item-text">
                                    历史
                                </div>
                            </div>
                            <div className="dropitem-content">
                                <div className="history">
                                    <div className="history-item">
                                        <span className="time">2018-9-10 </span> <span className="history-text" style={{color: this.getRandomColor()}}> 你好啊 </span>
                                    </div>
                                    <div className="history-item">
                                        <span className="time">2018-9-10 </span> <span className="history-text" style={{color: this.getRandomColor()}}> 你好啊 </span>                                      
                                    </div>                                    
                                    <div className="history-item">
                                        <span className="time">2018-9-10 </span> <span className="history-text" style={{color: this.getRandomColor()}}> 你好啊 </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            userinfo && userinfo.email ? (
                                <div className="auth-detail">
                                    <div className="dropitem">
                                        <div className="item">
                                            <div className="icon-subscribe">
                                            </div>
                                            <div className="item-text">
                                                订阅
                                            </div>
                                        </div>
                                        <div className="dropitem-content">
                                            <div className="subscribe">
                                                <div className="subscribe-item">
                                                    <div className="subscribe-left">
                                                        <img src={avator_jpg} className="avator" />
                                                        <div className="user-detail">
                                                            <div className="user-title" style = {{color: this.getRandomColor()}}>
                                                                胖炸
                                                            </div>
                                                            <div className="signature">
                                                                你是我的最爱
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="subscribe-right">
                                                        <img src={watch_svg} className="watch-img" /> <span> 0 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item" onClick={() => this.switchToLink('/uploadfile')}>
                                        <div className="icon-upload">
                                        </div>
                                        <div className="item-upload-text">
                                            上传视频
                                        </div>
                                    </div>
                                    <div className="dropitem">
                                        <span className="auth-detail-user" onClick={() => this._handleToLinkPerson()}>    
                                            <img src={ userinfo.avator || avator_default_jpg } />
                                            <span className="text"> { userinfo.username } </span> 
                                            <span className="closeBox"></span>
                                        </span>
                                        <div className="dropitem-content">
                                            <img className="drop-img" src={ userinfo.avator || avator_default_jpg } onClick={() => this._handleToLinkPerson()}/>
                                            <div className="auth-userinfo">
                                                <div className="userinfo-username">
                                                    { userinfo.username } <img src={ userinfo && userinfo.sex == '0' ? man_svg : (userinfo && userinfo.sex == '1' ? woman_svg : sex_svg) } />
                                                </div>
                                                <div className="userinfo-age">
                                                    <img src = {location}/> {userinfo.location || '火星'}
                                                    <img src ={age} /> {userinfo.age || '20岁'}
                                                </div>
                                                <div className="userinfo-signature">
                                                    <img src={autograph} /> { userinfo.signature || '您并没有签名' }
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