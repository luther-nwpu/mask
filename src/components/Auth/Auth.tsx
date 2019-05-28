import * as React from 'react'
import './Auth.scss'
import { AuthTab } from '@config'
import mylogo from '@assets/mylogo.png'
import warningImg from '@assets/warning_btn_0.svg'
import { connect } from 'react-redux'
import { displayAuth } from '@store/actions/auth'
import { storeUserInfo } from '@store/actions/todoApp'
import { Post, tryCatch } from '@lib/helper'
import { withCookies } from 'react-cookie'

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabNum: props.authTab,
            login: {
                username: '',
                password: '',    
                oneWeekLogin: true
            },
            register: {
                account: '',
                password: '',
                passwordConfirm: '',
                checkCode: '',
                second: 0,
                alreadyRead: false
            },
            error: {
                id: '',
                message: ''
            }
        }
    }
    props
    public state = {
        tabNum: AuthTab.REGISTER,
        login: {
            username: '',
            password: '',    
            oneWeekLogin: true
        },
        register: {
            account: '',
            password: '',
            passwordConfirm: '',
            checkCode: '',
            second: 0,
            alreadyRead: false
        },
        error: {
            id: '',
            message: ''
        }
    }
    dealError(id, message) {
        this.setState({
            error: {
                id: id,
                message: message
            }
        })
        setTimeout(() => {
            this.clearError()
        }, 3000)
    }
    public changeTab(tabNum: Number) {
        this.setState({ tabNum })
    }
    public handleLoginUsername(event: any) {
        this.setState({ login: { ...this.state.login, username: event.target.value }})
    }
    public handleLoginPassword(event: any) {
        this.setState({ login: { ...this.state.login, password: event.target.value }})
    }
    public handleRegisterPassword(event: any) {
        this.setState({register: { ...this.state.register, password: event.target.value }})    
    }
    public handleRegisterPasswordConfirm(event: any) {
        this.setState({register: { ...this.state.register, passwordConfirm: event.target.value }})
    }
    public handleRegisterAccount(event: any) {
        this.setState({register: {...this.state.register, account: event.target.value, }})
    }
    public handleRegisterCheckcode(event: any) {
        this.setState({register: {...this.state.register, checkCode: event.target.value, }})
    }
    public handleRegisterAlreadRead(event: any) {
        this.setState({register: {...this.state.register, alreadyRead: event.target.value, }})
    }
    public handleLoginOneWeekLogin(event: any) {
        this.setState({login: {...this.state.register, oneWeekLogin: event.target.value, }})
    }
    closeModal() {
        this.props.displayAuth(false, AuthTab.LOGIN)
    }
    clearError() {
        this.setState({
            error: {
                id: '',
                message: ''
            }
        })
    }
    async sendEmail() {
        if (this.state.register.account === '') {
            this.dealError('register-username', '请输入邮箱')
            return
        } else if (!(/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.state.register.account))) {
            this.dealError('register-username', '邮箱格式不正确')
            return
        } else {
            const [res, error] = await tryCatch(Post('/api/auth/sendEmail', { email: this.state.register.account }))
            if (error) {
                alert(error)
            } else {
                this.setState({
                    register:{
                        ...this.state.register, second: 60
                    }
                })
                const interval = window.setInterval(() =>{
                    if (this.state.register.second === 0) {
                        clearInterval(interval)
                    }
                    this.setState({
                        register:{
                            ...this.state.register, second: this.state.register.second - 1
                        }
                    })
                }, 1000)
            }
        }
    }
    async login() {
        if (this.state.login.username === '') {
            this.dealError('login-email', '请输入邮箱')
            return
        } else if (!(/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.state.login.username))) {
            this.dealError('login-email', '邮箱格式不正确')
            return
        } else if (this.state.login.password === '') {
            this.dealError('login-password', '请输入密码')
            return
        } else {
            const res = await Post('/auth/login', {
                email: this.state.login.username,
                password: this.state.login.password
            })
            if(res.success) {
                const { cookies }= this.props
                const maxAge = this.state.login.oneWeekLogin ?　7*24*60*60 : 1*24*60*60
                cookies.set('Authorization', `Bearer ${res.result.token}`, {
                    maxAge: maxAge
                })
                cookies.set('userinfo', res.result.userinfo, {
                    maxAge: maxAge
                })
                this.props.storeUserInfo(res.result.userinfo)
                this.closeModal()
            } else {
                this.dealError('login-password', '用户不存在或者密码错误')
                return
            }
        }
    }
    async register() {
        if (this.state.register.account === '') {
            this.dealError('register-username', '请输入邮箱')
            return
        } else if (!(/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.state.register.account))) {
            this.dealError('register-username', '邮箱格式不正确')
            return
        } else if (this.state.register.password === '') {
            this.dealError('register-password', '请输入密码')
            return
        } else if (!(/^(?!([A-Z]*|[a-z]*|[0-9]*|[!-/:-@\[-`{-~]*|[A-Za-z]*|[A-Z0-9]*|[A-Z!-/:-@\[-`{-~]*|[a-z0-9]*|[a-z!-/:-@\[-`{-~]*|[0-9!-/:-@\[-`{-~]*)$)[A-Za-z0-9!-/:-@\[-`{-~]{8,20}$/.test(this.state.register.password))) {
            this.dealError('register-password', '三种，并且8-20')
            return
        } else if (this.state.register.password !== this.state.register.passwordConfirm) {
           this.dealError('register-confirmpassword', '两次密码不一致')
        } else if(this.state.register.checkCode === '') {
            this.dealError('register-checkcode', '请输入验证码')
        } else {
           const [res, error] = await tryCatch(Post('auth/register', {
               email: this.state.register.account,
               checkcode: this.state.register.checkCode,
               password: this.state.register.password
           }))
           if (error) {
               alert(error)
           } else {
               if(res.success) {
                   this.changeTab(AuthTab.LOGIN)
               } else {
                   this.dealError(res.result.id, res.result.message)
                   return
               }
           }
        }        
    }
    public render() {
        return (
            <div className="auth-component">
                <div className="modal">
                    <div className="close" onClick={() => this.closeModal()}></div>
                    <div className="title">
                        <div className={ this.state.tabNum === AuthTab.LOGIN ? 'item_select' : 'item'} onClick={() => this.changeTab(AuthTab.LOGIN)}>                        
                            登录
                        </div>
                        <div className={this.state.tabNum === AuthTab.REGISTER ? 'item_select' : 'item'} onClick={() => this.changeTab(AuthTab.REGISTER)}>                        
                            注册
                        </div>
                    </div>
                    <div className="auth-content">
                        <div className="left">
                            { this.state.tabNum === AuthTab.LOGIN ? (
                                <div className="login">
                                    <div className="login-item">
                                        账号登录
                                    </div>
                                    <div className="item">
                                        <div className={this.state.error.id === 'login-email' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input value={this.state.login.username} onChange={() => this.handleLoginUsername(event)} placeholder="请输入邮箱/手机/账号"/>
                                    </div>
                                    <div className="item">
                                        <div className={this.state.error.id === 'login-password' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input type="password" value={this.state.login.password} onChange={() => this.handleLoginPassword(event)} placeholder="请输入密码"/>
                                    </div>
                                    <div className="item">   
                                        <div className="judgelogin">
                                            <input defaultChecked={this.state.login.oneWeekLogin} onChange={() => this.handleLoginOneWeekLogin(event)}  type="checkbox" />
                                            <div> 一周内自动登录 </div>
                                        </div>
                                        <div className="switchFindPassword">
                                            <a href="/findPassword">找回密码</a>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <button onClick={() => this.login()}> 登录 </button>
                                    </div>
                                </div>       
                            ) : (
                                <div className="register">
                                    <div className="item-username">
                                        <div className={this.state.error.id === 'register-username' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input value={this.state.register.account} onChange={() => this.handleRegisterAccount(event)} placeholder="请输入邮箱" />
                                    </div>
                                    <div className="item">
                                        <div className={this.state.error.id === 'register-password' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input type="password" value={this.state.register.password} onChange={() => this.handleRegisterPassword(event)} placeholder="请输入密码"/>
                                    </div>
                                    <div className="item">
                                        <div className={this.state.error.id === 'register-confirmpassword' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input type="password" value={this.state.register.passwordConfirm} onChange={() => this.handleRegisterPasswordConfirm(event)} placeholder="重新输入密码"/>
                                    </div>
                                    <div className="check">
                                    <   div className={this.state.error.id === 'register-checkcode' ? 'item-error' : 'item-noerror'}>
                                            <img src={warningImg} /> {this.state.error.message}
                                        </div>
                                        <input value={this.state.register.checkCode} onChange={() => this.handleRegisterCheckcode(event)} placeholder="请输入验证码"/> 
                                        <button disabled={this.state.register.second > 0} onClick={() => this.sendEmail()}> { this.state.register.second === 0 ? '获取验证码' : `${this.state.register.second}秒`}</button>
                                    </div>
                                    <div className="account-item">
                                        <input defaultChecked={this.state.register.alreadyRead} onChange = {() => this.handleRegisterAlreadRead(event)} type="checkBox" />
                                        我已经阅读用户协议书。
                                    </div>
                                    <div className="register-item">
                                        <button disabled={!this.state.register.alreadyRead} onClick={() => this.register()}> 注册 </button>
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
const mapStateToProps = (state) => {
    const { authTab } = state.auth
    return {
        authTab: authTab
    }
}
const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab)),
    storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo))
})

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Auth))