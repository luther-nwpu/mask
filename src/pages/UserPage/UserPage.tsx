import * as React from 'react'
import './UserPage.scss'
import cover_jpg from '@assets/cover_btn_0.jpg'
import avator_jpg from '@assets/avator_default.jpg'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import man_svg from '@assets/man_btn_0.svg'
import woman_svg from '@assets/woman_btn_0.svg'
import { Get } from '@lib/helper'

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
                                       <span> dsafjafa </span>
                                       <img className="sex-svg" src={man_svg} />
                                    </div>
                                    <div className="signature">
                                        dsadsadafad
                                    </div>
                                </div>
                                
                            </div>
                            <div className="right">
                                <button className="subscribe-user">
                                    订阅
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
                            <div className="haiyou-item">
                                <img className="item-img" src = { draft_default_png } />
                                <div className="item-detail">
                                    <div>
                                        dddddddddddddddddddd
                                    </div>
                                </div>
                            </div>
                            <div className="haiyou-item">
                                <img className="item-img" src = { draft_default_png } />
                                <div className="item-detail">
                                    <div>
                                        dddddddddddddddddddd
                                    </div>
                                </div>
                            </div>
                            <div className="haiyou-item">
                                <img className="item-img" src = { draft_default_png } />
                                <div className="item-detail">
                                    <div>
                                        dddddddddddddddddddd
                                    </div>
                                </div>
                            </div>
                            <div className="haiyou-item">
                                <img className="item-img" src = { draft_default_png } />
                                <div className="item-detail">
                                    <div>
                                        dddddddddddddddddddd
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        )
    }
}