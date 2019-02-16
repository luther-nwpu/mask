import * as React from 'react'
import { Component } from 'react'
import './TopBar.scss'
import logo from '@assets/logo.png'
import arrow from '@assets/arrow.svg'
export class TopBar extends Component {
    render() {
        return (
            <div className="topbar">
                <div className="topbar-content">
                    <div className="left">
                        <a href ="/"> <img src={logo} /> </a>
                        <div className="item">
                            首页
                        </div>
                        <div className="item">
                            <div> 分类 </div>
                            <span className="closeBox" >
                            </span>
                        </div>
                        <div className="item">
                            热门
                            <span className="closeBox" >
                            </span>
                        </div>
                        <div className="item">
                            排行榜
                            <span className="closeBox">
                            </span>
                        </div>
                        <div className="input">
                            <input type = "text" />
                            <div className="icon">
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="item">
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
            </div>
        )
    }
}