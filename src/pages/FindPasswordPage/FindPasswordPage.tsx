import * as React from 'react'
import './FindPasswordPage.scss'
import { step } from '@config'
import success_svg from '@assets/success_btn_0.svg'

export class FindPasswordPage extends React.Component {
    public state = {
        step: step.FINISH,
        second: 0
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
                                    <div className="input"> <input placeholder="请输入邮箱名" /> </div>
                                    <button> 下一步 </button>
                                </div>
                            ) : this.state.step == step.RESETPASSWORD ?
                            (
                                <div className="state-two">
                                    <div className="text">
                                        发送验证码至 <span className="key"> { '246666232'} </span>
                                    </div>
                                    <div className="checkcode">                                    
                                        <input />
                                        <button disabled={ this.state.second > 0 }> { this.state.second === 0 ? '获取验证码' : `${this.state.second}秒`} </button>
                                    </div>
                                    <div className="password">                                    
                                        <input />
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