import * as React from 'react'
import './MyMessage.scss'
import avator_default_jpg from '@assets/avator_default.jpg'
import chatroom_btn_jpg from '@assets/chatroom_btn_0.jpg'

export class MyMessage extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        messageArray: [
            {
                userid: 0,
                userName: 'Luther',
                userAvator: null,
                messageArray: [
                    {
                        content: '',
                        is_me: true,
                        send_time: '2019_0_0',
                        is_read: true
                    }
                ]
            },
            {
                userid: 0,
                userName: 'Luther',
                userAvator: null,
                messageArray: [
                    {
                        content: '',
                        is_me: true,
                        send_time: '2019_0_0',
                        is_read: true
                    }
                ]
            },
            {
                userid: 0,
                userName: 'Luther',
                userAvator: null,
                messageArray: [
                    {
                        content: '',
                        is_me: true,
                        send_time: '2019_0_0',
                        is_read: true
                    }
                ]
            }
        ]
    }
    public render() {
        return (
            <div className="message-component">
                <div className="left-user">
                    <div className="left-user-title">
                        <img src ={ chatroom_btn_jpg } /> 
                        <span>好嗨哟撩你了</span>
                    </div>
                    <div className="user-search">
                        <input placeholder="搜索" />
                        <div className="search-img">
                        </div>                     
                    </div>
                    <div className="user-item">
                        <img src={ avator_default_jpg }/>
                        <div className="user-detail">
                            <div className="detail-top">
                                <span className="detail-name">
                                    {'Luther'}
                                </span>
                                <span className="detail-time">
                                    {'2015-4-30'}
                                </span>
                            </div>
                            <div className="detail-bottom">
                                <span> {'dcoafjhkfjsa'} </span>
                                <span> {'dsadhs'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <div className="right-content-title">
                        <img src={ chatroom_btn_jpg } />
                        <span>{'dsa'}</span>
                    </div>
                    <div className="right-content-content">
                        <div className="message-item">
                            <div className="item-time">
                                {'2015303320'}
                            </div>
                            <div className="item-content-0">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                            <div className="item-content-1">
                                <img src={ chatroom_btn_jpg } />
                                <div className="item-content-right">
                                    <div className="title">
                                        {'你好啊'}
                                    </div>
                                    <div className="content-text">
                                        {'我不好'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="send-message">
                        <div className="send-message-title">
                            好消息,好消息,请回复下好消息
                        </div>
                        <textarea placeholder="请回复一下" />
                        <div className="send-message-bottom">                        
                            <div className="button">发送</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}