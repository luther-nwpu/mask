import * as React from 'react'
import './Auth.scss'
import { AuthTab } from '@config'
import  mylogo from '@assets/mylogo.png'
export class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabNum: AuthTab.REGISTER,
            login: {
                username: '',
                password: ''
            }
        }
    }
    public state = {
        tabNum: AuthTab.REGISTER,
        login: {
            username: '',
            password: ''
        }
    }
    public changeTab(tabNum: Number) {
        this.setState({ tabNum })
    }
    public handleLoginUsername(event: any) {
        this.setState({ login: { username: event.target.value }, ...this.state.login })
    }
    public handleLoginPassword(event: any) {
        this.setState({ login: { password: event.target.value }, ...this.state.login })
    }
    public render() {
        return (
            <div className="auth-component">
                <div className="modal">
                    <div className="close"></div>
                    <div className="title">
                        <div className={ this.state.tabNum === AuthTab.LOGIN ? 'item_select' : 'item'} onClick={() => this.changeTab(AuthTab.LOGIN)}>                        
                            登录
                        </div>
                        <div className={this.state.tabNum === AuthTab.REGISTER ? 'item_select' : 'item'} onClick={() => this.changeTab(AuthTab.REGISTER)}>                        
                            注册
                        </div>
                    </div>
                    <div className="content">
                        <div className="left">
                            { this.state.tabNum === AuthTab.LOGIN ? (
                                <div className="login">
                                    <div className="item">
                                        账号登录
                                    </div>
                                    <div className="item">
                                        <input value={this.state.login.username} onChange={() => this.handleLoginUsername(event)} placeholder="请输入邮箱/手机/账号"/>
                                    </div>
                                    <div className="item">
                                        <input value={this.state.login.password} onChange={() => this.handleLoginPassword(event)} placeholder="请输入密码"/>
                                    </div>
                                    <div className="item">   
                                        <div className="judgelogin">
                                            <input type="checkbox" />
                                            <div> 一周内自动登录 </div>
                                        </div>
                                        <div className="switchFindPassword">
                                            <a href="/findPassword">找回密码</a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <button> 登录 </button>
                                    </div>
                                </div>       
                            ) : (
                                <div className="register">
                                    <div className="item-username">
                                        <select> 
                                            <option value="0">邮箱</option>
                                            <option value="1">手机</option>
                                        </select>
                                        <input />
                                    </div>
                                    <div className="item">
                                        <input type="password" placeholder="请输入密码"/>
                                    </div>
                                    <div className="item">
                                        <input type="password" placeholder="重新输入密码"/>
                                    </div>
                                    <div className="check">
                                        <input placeholder="请输入验证码"/> 
                                        <button>获取验证码</button>
                                    </div>
                                    <div className="item">
                                        <input type="checkBox" />
                                        我已经阅读用户协议书。
                                    </div>
                                    <div className="register-item">
                                        <button> 注册 </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="right">
                            <img src= {mylogo} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}