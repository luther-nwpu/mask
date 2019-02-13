import * as React from 'react'
import { Component } from 'react'
import './TopBar.scss'
import logo from '@assets/logo.svg'
export class TopBar extends Component {
    render() {
        return (
            <div className="topbar">
                <div className="topbar-content">
                    <img src={logo} />
                    <div className="luther">
                        <div className="luther-title">
                            露露视频
                        </div>
                        <div className="luther-content">
                            luther.com
                        </div>
                    </div>
                    <div className="">
                        首页
                    </div>
                    <div>
                        分类
                    </div>
                    <div>
                        热门
                    </div>
                    <div>
                        排行榜
                    </div>
                    <div>
                        历史
                    </div>
                    <div>
                        登录
                    </div>
                    <div>
                        注册
                    </div>
                </div>
            </div>
        )
    }
}