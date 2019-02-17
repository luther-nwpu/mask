import * as React from 'react'
import './Auth.scss'
import { AuthTab } from '@config'
export class Auth extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        tabNum: AuthTab.LOGIN
    }
    public changeTab(tabNum: Number) {
        this.setState({ tabNum })
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
                        
                        { this.state.tabNum === AuthTab.LOGIN ? (
                            <div>
                                <div>
                                    账号登录
                                </div>
                                <div>
                                    <input />
                                </div>
                                <div>
                                    <input />
                                </div>
                                <div>   
                                    <div>
                                        <input type="checkbox" />
                                        一周内自动登录
                                    </div>
                                    <div>
                                        找回密码
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>       
                        ) : (
                            <div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}