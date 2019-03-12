import * as React from 'react'
import './Auth.scss'
import { AuthTab, AccountType } from '@config'
import mylogo from '@assets/mylogo.png'
import warningImg from '@assets/warning_btn_0.svg'
import { connect } from 'react-redux'
import { displayAuth, storeUserInfo } from '@store/actions'
import { Post } from '@lib/helper'
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
                accountType: AccountType.EMAIL,
                account: '',
                password: '',
                passwordConfirm: '',
                checkCode: ''
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
            accountType: AccountType.EMAIL,
            account: '',
            password: '',
            passwordConfirm: '',
            checkCode: ''
        },
        error: {
            id: '',
            message: ''
        }
    }
    alreadyRead: false
    public changeTab(tabNum: Number) {
        this.setState({ tabNum })
    }
    public handleLoginUsername(event: any) {
        this.setState({ login: { ...this.state.login, username: event.target.value }})
    }
    public handleLoginPassword(event: any) {
        this.setState({ login: { ...this.state.login, password: event.target.value }})
    }
    public handleRegisterSelect(event: any) {
        this.setState({register: { ...this.state.register, accountType: event.target.value }})
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
        this.alreadyRead = event.target.value
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
    async login() {
        if (this.state.login.username === '') {
            this.setState({
                error: {
                    id: 'login-email',
                    message: '请输入邮箱'
                }
            })
            setTimeout(() => {
                this.clearError()
            }, 3000)
            return
        } else if (!(/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.state.login.username))) {
            this.setState({
                error: {
                    id: 'login-email',
                    message: '邮箱格式不正确'
                }
            })
            setTimeout(() => {
                this.clearError()
            }, 3000)
            return
        } else if (this.state.login.password === '') {
            this.setState({
                error: {
                    id: 'login-password',
                    message: '请输入密码'
                }
            })
            setTimeout(() => {
                this.clearError()
            }, 3000)
            return
        } else {
            const res = await Post('auth/login', {
                email: this.state.login.username,
                password: this.state.login.password
            })
            if(res.success) {
                const cookies = this.props
                const maxAge = this.state.login.oneWeekLogin ?　7*24*60*60 : 1*24*60*60
                cookies.set('Authorization', `Bearer ${res.result.token}`, {
                    maxAge: maxAge
                })
                cookies.set('userinfo', res.result.userinfo, {
                    maxAge: maxAge
                })
                this.props.storeUserInfo(res.result.userInfo)
                this.closeModal()
            } else {
                this.setState({
                    error: {
                        id: 'login-password',
                        message: '用户不存在或者密码错误'
                    }
                })
                setTimeout(() => {
                    this.clearError()
                }, 3000)
                return
            }
        }
    }
    async register() {
        await Post('api/auth/register', this.state.register)
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
                                        <select value={this.state.register.accountType} onChange={() => this.handleRegisterSelect(event)}> 
                                            <option value={AccountType.EMAIL}>邮箱</option>
                                            <option value={AccountType.TELEPHONE}>手机</option>
                                        </select>
                                        <input value={this.state.register.account} onChange={() => this.handleRegisterAccount(event)} placeholder={this.state.register.accountType === AccountType.EMAIL ? '请输入邮箱' : '请输入手机号'} />
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
                                        <button>获取验证码</button>
                                    </div>
                                    <div className="account-item">
                                        <input defaultChecked={this.alreadyRead} onChange = {() => this.handleRegisterAlreadRead(event)} type="checkBox" />
                                        我已经阅读用户协议书。
                                    </div>
                                    <div className="register-item">
                                        <button onChange={() => this}> 注册 </button>
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