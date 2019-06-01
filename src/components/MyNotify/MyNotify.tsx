import * as React from 'react'
import './MyNotify.scss'
import avator_jpg from '@assets/avator_default.jpg'
import draft_jpg from '@assets/draft_default_btn_0.jpg'
export class MyNotify extends React.Component {
    constructor(props: any) {
        super(props)
    }
    public render() {
        return (
            <div className = "mynotify-component">
                <div className="mynotify-content">
                    <div className="mynotify-item">
                        <img src={ avator_jpg } className="avator" />
                        <div className="user-detail">
                            <span className="username">dssssssssa</span>
                            <span className="signature"> 我的签名 </span>
                        </div>
                        <span>评论了您的视频 </span> 
                        <img src={ draft_jpg } className="draft-img"/>
                        <div className="video-detail">          
                            <span className="video-title">我喜欢你</span>
                            <span className="label-text"> label </span>
                        </div>
                        <span>
                            小伙子，你好啊
                        </span>
                    </div>
                    <div className="mynotify-item">
                        <img src={ avator_jpg } className="avator" />
                        <span>向你发送了消息: </span>
                        <span className="message"> 我好爱你哦 </span>
                    </div>
                </div>
            </div>
        )
    }   
}