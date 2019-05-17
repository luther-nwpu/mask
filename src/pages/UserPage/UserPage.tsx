import * as React from 'react'
import './UserPage.scss'
import cover_jpg from '@assets/cover_btn_0.jpg'
import avator_jpg from '@assets/avator_default.jpg'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import man_svg from '@assets/man_btn_0.svg'
import woman_svg from '@assets/woman_btn_0.svg'
import { Get } from '@lib/helper'
import watch_svg from '@assets/watch_btn_0.svg'

export class UserPage extends React.Component {
    getRandomColor () {
        return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6)
    }
    props
    fetchGetHaiyousByUserId() {
        Get('/haiyou/getAllHaiyouByUserId', {
            userId: this.props.match.params.id
        }).then(res => {
            if(res.success) {
                const result = res.result
                this.setState({
                    haiyous: result.haiyous,
                    subscribe: result.subscribe,
                    userinfo: result.user
                })
            }
        })
    }
    public componentWillMount() {
        this.fetchGetHaiyousByUserId()
    }
    public state = {
        haiyous: [],
        userinfo: {},
        subscribe: null
    }
    public render() {
        return (
            <div className="userpage-component">
                <div className="userpage-content">
                    <div className="username">
                        <img className="cover-img" src={ cover_jpg } />
                        <div className="userinfo">
                            <div className="left">
                                <img className="avator-img" src={ avator_jpg } />
                                <div className="user-detail">
                                    <div className="title">
                                       <span> { this.state.userinfo && this.state.userinfo['username'] } </span>
                                       <img className="sex-svg" src={ this.state.userinfo && this.state.userinfo['sex'] ? man_svg : woman_svg } />
                                    </div>
                                    <div className="signature">
                                        { this.state.userinfo && this.state.userinfo['signature'] || '您当前并没有签名'  }
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <button className="subscribe-user">
                                   { this.state.subscribe ? '已订阅' : '订阅' }
                                </button>
                                <button className="send-message">
                                    发消息
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="haiyous">
                        <div className="haiyous-title">
                            {
                                '我的视频'.split('').map((value, key) => {
                                    return (
                                        <span key={key} style={{color: this.getRandomColor()}}>
                                            { value }
                                        </span>
                                    )
                                })
                            }
                            
                        </div>
                        <div className="all-haiyous">
                            {
                                this.state.haiyous.map((value, key) => {
                                    return (
                                        <div key={key} className="haiyou-item">
                                            <img className="item-img" src = { draft_default_png } />
                                            <div className="item-detail">
                                                <div className="user-title" style={{ color: this.getRandomColor()}}>
                                                    { value && value.title || 'haiyou, 不能为空的哦' }
                                                </div>
                                                <div className="user-detail" style={{ color: this.getRandomColor() }}>
                                                    <div className="label">
                                                        { value && value.label.split('_').join(' ') || 'No No No Label' }
                                                    </div>
                                                    <div className="watch">
                                                        <img className="watch-img" src={ watch_svg } />
                                                        { value && value.hot || 0}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                      
                    </div>
                </div>
            </div>
        )
    }
}