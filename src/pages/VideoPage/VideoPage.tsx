import * as React from 'react'
import './VideoPage.scss'
import { Video } from '@components'
import support from '@assets/follow-btn-0.svg'
import alreadtySupport from '@assets/follow-btn-1.svg'

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
            title: '[你好]，我爱你姚菊',
            category: '',
            time: '',
            playNum: 4000,
            barrage: [],
            videoUrl: '',
            comment: [],
            supportNum: [],
            collectNum: [],
            RevelentVideo: []
        }
    }
    public render() {
        return(
            <div className="videopage-component">
                <div className="left-video">
                    <div className="video-title">
                        {this.state.video.title}
                    </div>
                    <div className="video-description">

                    </div>
                    <div className="video-video">
                        <Video></Video>
                    </div>
                    <div className="video-support">

                    </div>
                    <div className="video-detail">

                    </div>
                    <div className="video-comment">

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