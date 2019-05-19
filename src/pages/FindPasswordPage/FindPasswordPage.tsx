import * as React from 'react'
import './FindPasswordPage.scss'
import { step } from '@config'
import success_svg from '@assets/success_btn_0.svg'
import error_svg from '@assets/error_btn_0.svg'
import { Post, tryCatch } from '@lib/helper'
export class FindPasswordPage extends React.Component {
    public state = {
        step: step.FILLEMAIL,
        second: 0,
        emailInput: '',
        checkcodeInput: '',
        passwordInput: '',
        error: {} // error { '', message}
    }
    public _handleChangeEmail(e) {
        this.setState({
            error: {},
            emailInput: e.target.value
        })
    }
    public handleToResetPassword() {
        if (!/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(this.state.emailInput)) {
            this.state.error['email'] = '邮箱格式不正确'
            this.setState({
                error: this.state.error
            })
        } else {    
            this.setState({
                step: step.RESETPASSWORD
            })
        }
    }
    public _handleChangePasswordInput(e) {
        this.setState({
            error: {},
            passwordInput: e.target.value
        })
    }
    _handleChangeCheckcodeInput(e) {
        this.setState({
            error: {},
            checkcodeInput: e.target.value
        })
    }
    async handleChangeSendEmail() {
        const [res, error] = await tryCatch(Post('/auth/sendEmail', { email: this.state.emailInput }))
        if (error) {
            alert(error)
        } else {
            this.setState({
                second: 60
            })
            const interval = window.setInterval(() =>{
                if (this.state.second === 0) {
                    clearInterval(interval)
                }
                this.setState({
                    second: this.state.second - 1
                })
            }, 1000)
        }
    }
    public render() {
        return (
            <div className="findpassword-page">
                <div className="findpassword-content">    
                    <nav className="title">
                        <a className={ this.state.step >= step.FILLEMAIL ? 'select' : ''} >填写资料</a>
                        <a className={ this.state.step >= step.RESETPASSWORD ? 'select' : '' } >重置密码</a>
                        <a className={ this.state.step >= step.FINISH ? 'select' : '' } >完成</a>
                    </nav>
                    <div className="content">
                        {
                            this.state.step == step.FILLEMAIL ? 
                            (    
                                <div className="state-one">
                                    <div className="input"> <input value = { this.state.emailInput } placeholder="请输入邮箱名" onChange={(e) => this._handleChangeEmail(e)}/> </div>
                                    <div className={ this.state.error && this.state.error['email'] ? 'error' : 'no-error'}> <img src={ error_svg } /> <span> { this.state.error && this.state.error['email'] } </span> </div>
                                    <button onClick = { () => this.handleToResetPassword() }> 下一步 </button>
                                </div>
                            ) : this.state.step == step.RESETPASSWORD ?
                            (
                                <div className="state-two">
                                    <div className="text">
                                        发送验证码至 <span className="key"> { this.state.emailInput } </span>
                                    </div>
                                    <div className="checkcode">                                    
                                        <input onChange={(e) => this._handleChangeCheckcodeInput(e)} value = { this.state.checkcodeInput } placeholder="请输入验证码"/>
                                        <button disabled={ this.state.second > 0 } onClick={ () => this.handleChangeSendEmail()}> { this.state.second === 0 ? '获取验证码' : `${this.state.second}秒`} </button>
                                    </div>
                                    <div className="password">                                    
                                        <input value = { this.state.passwordInput } onChange = {(e) => this._handleChangePasswordInput(e)} placeholder="请输入密码" type="password"/>
                                    </div>
                                    <button className ="reset-password"> 重置密码 </button> 
                                </div>
                            ) :
                            (
                                <div className="state-three">
                                    <img src={success_svg } />
                                    <button> 重新登录 </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}