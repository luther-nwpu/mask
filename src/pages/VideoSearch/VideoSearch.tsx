import * as React from 'react'
import './VideoSearch.scss'
import search_svg from '@assets/search_btn_0.png'
import logo from '@assets/logo.png'

export class VideoSearch extends React.Component {
    public state = {
        user_open: false,
        video_open: true
    }
    public render() {
        return (
            <div className="videosearch-page">
                <div className="video-search">
                        <img src={logo} className="logo"/>
                        <input placeholder="请输入你想要找的小Haiyou" className="search-input"/>
                        <div className="search-btn">
                            <img src={ search_svg } />
                            <span className="text">搜索</span>
                        </div>
                </div>
                <div className= "user-list">
                    <div className="user-top">
                        <div className="left">
                            用户列表
                        </div>
                        <div className={this.state.user_open ? 'right-select' : 'right'}>
                        </div>                   
                    </div>
                    <div className="user-content">
                        <div className="user-item">

                        </div>
                    </div>
                </div>
                <div className="video-list">
                    <div className="video-top">    
                        <div className="left">
                            视频列表
                        </div>
                        <div className={this.state.video_open ? 'right-select' : 'right'}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}