import * as React from 'react'
import './VideoPage.scss'
import Video from '@components/Video/Video'
import support from '@assets/follow-btn-0.svg'
import alreadtySupport from '@assets/follow-btn-1.svg'
import * as _ from 'lodash'
import {  Get } from '@lib/helper'

export class VideoPage extends React.Component {
    public state = {
        userinfo: {
            avator: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550510853565&di=4eddd8436a89c3e19043946f3e7fa8ed&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Feac4b74543a982265bd540e38782b9014b90ebda.jpg',
            userid: '',
            signature: '你好啊，小美女',
            username: '闪亮的星空',
            followNum: 10000
        },
        video: {
            id: '',
            title: '[你好]，我爱你姚菊',
            category: {
                name: '游戏',
                id: 0,
                category: {
                    name: '竞技',
                    id: 1,
                    category: null
                }
            },
            time: '2019-02-22 11:00:13',
            playNum: 4000,
            barrage: [],
            videoUrl: '',
            comment: [],
            supportNum: [],
            collectNum: [],
            RevelentVideo: []
        }
    }
    props
    public constructor(props) {
        super(props)
        console.log(props)
    }
    async componentWillMount() {
        await this.getHaiyou()
    }
    async getHaiyou() {
        const res = await Get('/haiyou/getHaiyouById', {
            haiyouId: this.props.match.params.id
        })
        if(res.success) {
            const result = res.result
            const user = result.user
            this.setState({
                userinfo: {
                    ...this.state.userinfo,
                    userid: user.id,
                    signature: user.signature,
                    username: user.username,
                    avator: user.picture && user.picture.url
                }
            })
            console.log(res)
        }
    }
    public render() {
        return(
            <div className="videopage-component">
                <div className="left-video">
                    <div className="video-main">
                        <div className="video-title">
                            {this.state.video.title}
                        </div>
                        <div className="video-description">
                            <span>
                                {
                                    (() => {
                                        const sear = (obj: Object, arr: any) => {
                                        if (obj['category'] === undefined || obj['category'] === null) {
                                            return arr
                                        }
                                        arr.push({name:obj['category'].name, id: obj['category'].id})
                                        return sear(obj['category'], arr)
                                        }
                                        const result = sear(this.state.video, [])
                                        console.log(result)
                                        return (<span>{ result.reduce(function(accumulator: string, value: any, key: Number) {
                                            if(key === result.length - 1) {
                                                return accumulator + value.name
                                            } else {
                                                return accumulator + value.name + '>'
                                            } 
                                        }, '')} </span>)
                                    })()   
                                }
                            </span>
                            <span className="time">
                                {this.state.video.time}
                            </span>
                        </div>
                        <div className="video-video">
                            <div className="video-tab">
                                <div className="tab">
                                    <div className="tab-text">
                                        <div className="dd">
                                            你好啊
                                        </div>
                                    </div>
                                </div>
                                <div className="tab">
                                    <div className="tab-text">
                                        <div className="dd">
                                            你好啊
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Video src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/1500_a5a9fa0998476beed1d02aed4f5a79dc.mp4"></Video>
                        </div>

                    </div>

                </div>
                <div className="right-user">
                    <div className="user-detail">
                        <img src ={this.state.userinfo.avator} className="avator" />
                        <div className="user-detail-description">
                            <span className="username"> { this.state.userinfo.username }</span><span className="send-message"> <span>发消息</span></span> <span></span>
                            <div>
                                {this.state.userinfo.signature}
                            </div>
                            <div className="follow">
                                <img src={support}/> 订阅 | {this.state.userinfo.followNum}
                            </div>
                        </div>
                    </div>
                    <div className="video-barrage">
                    </div>
                    <div className="video-input">

                    </div>
                    <div className="video-recommend">

                    </div>
                </div>
            </div>
        )
    }
}