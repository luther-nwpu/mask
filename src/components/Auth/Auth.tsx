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
    public render() {
        return (
            <div className="auth-component">
                <div className="modal">
                    <div className="close"></div>
                    <div className="title">
                        <div className={ this.state.tabNum === AuthTab.LOGIN ? 'item' : 'item_select'}>                        
                            登录
                        </div>
                        <div className={this.state.tabNum === AuthTab.REGISTER ? 'item' : 'item_select'}>                        
                            注册
                        </div>
                    </div>
                    <div className="content">
                        { this.state.tabNum === AuthTab.LOGIN ? (
                            <div>
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