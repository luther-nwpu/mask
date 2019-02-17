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
                    <div className="close">
                    </div>
                </div>
            </div>
        )
    }
}