import * as React from 'react'
import './VideoSearch.scss'
import search_svg from '@assets/search_btn_0.png'
import logo from '@assets/logo.png'
import user_avator from '@assets/avator_default.jpg'
import fans_svg from '@assets/fans_btn_0.svg'
import account_svg from '@assets/account_btn_3.svg'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import watch_svg from '@assets/watch_btn_0.svg'
import haiyou_jpg from '@assets/haiyou_btn_0.jpg'

export class VideoSearch extends React.Component {
    public state = {
        user_open: false,
        video_open: true
    }
    getRandomColor () {
        return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6)
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
                    {
                        this.state.user_open ? 
                        (
                            <div className="user-content">
                                <div className="empty-user">
                                    <img src={ account_svg } className="empty-img"/> 
                                    <span className="empty-text"> 当前搜索后并没有过用户 </span>
                                </div>
                                <div className="user-item">
                                    <img src={user_avator} className="avator-class" />
                                    <div className="item-detail">
                                        <div className="detail-title">
                                            我是小露露
                                        </div>
                                        <div className="detail-content">
                                            <div className="detail-signature">
                                                你是我天边最
                                            </div>
                                            <div className="detail-fans">
                                                <img src={fans_svg} className="fans-img" />
                                                <span className="fans-num">0 </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-item">
                                    <img src={user_avator} className="avator-class" />
                                    <div className="item-detail">
                                        <div className="detail-title">
                                            我是小露露
                                        </div>
                                        <div className="detail-content">
                                            <div className="detail-signature">
                                                你是我天边最
                                            </div>
                                            <div className="detail-fans">
                                                <img src={fans_svg} className="fans-img" />
                                                <span className="fans-num">0 </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        ''
                    }
                </div>
                <div className="video-list">
                    <div className="video-top">    
                        <div className="left">
                            视频列表
                        </div>
                        <div className={this.state.video_open ? 'right-select' : 'right'}>
                        </div>
                    </div>
                    <div className="video-content">
                        <div className="empty-video">
                            <img src={haiyou_jpg} className="empty-img"/>
                            <span className="empty-text">您搜索的小Haiyou没在这个库库中哦。</span>
                        </div>
                        <div className="video-item">
                            <img src={draft_default_png} className="draft-img" />
                            <div className="video-title" style={{ color: this.getRandomColor()}}>
                                { 'haiyou, 不能为空的哦' }
                            </div>
                            <div className="video-detail" style={{ color: this.getRandomColor() }}>
                                <div className="label">
                                    { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                                </div>
                                <div className="watch">
                                    <img className="watch-img" src={ watch_svg } />
                                    { /* value && value.hot*/ 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
