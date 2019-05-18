import * as React from 'react'
import './FindPasswordPage.scss'

export class FindPasswordPage extends React.Component {
    public render() {
        return (
            <div className="findpassword-page">
                <div className="findpassword-content">    
                    <nav className="title">
                        <a className="select">填写资料</a>
                        <a>重置密码</a>
                        <a>完成</a>
                    </nav>
                    <div className="content">
                        <div className="state-one">
                            <div className="input"> <input placeholder="请输入邮箱名" /> </div>
                            <button> 下一步 </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}