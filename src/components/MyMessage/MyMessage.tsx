import * as React from 'react'
import './MyMessage.scss'
import avator_default_jpg from '@assets/avator_default.jpg'
import chatroom_btn_jpg from '@assets/chatroom_btn_0.jpg'
import { Websocket } from '@lib/Websocket'
import { TokenGet, tryCatch } from '@lib/helper'
import { WebSocketType } from '@config'
import moment from 'moment'

export class MyMessage extends React.Component {
    constructor(props) {
        super(props)
    }
    public async componentWillMount() {
        this.fetchGetTunnelId()
        this.fecthGetChatByMe()
    }
    public fetchGetTunnelId() {
        TokenGet('/socket/getTunnelId').then(res=> {
            if(res.success) {
                this.setState({
                    ws: new Websocket({type: WebSocketType.CHAT, tunnelId: res.result})
                })
            }
        }).catch(err => {
            alert(err)
        })
    }
    public fecthGetChatByMe() {
        TokenGet('/chat/getAllChatByMe').then(res => {
            if(res.success) {
                this.setState({
                    messageArray: res.result.allMessage,
                    myId: res.result.myId           
                })
            }
        })
    }
    public _handleTextValue(e) {
        this.setState({
            messageInput: e.target.value
        })
    }
    public handleSendMessage() {
        this.state.ws.sendMessage({
            action: 'sendMessage',
            payload: {
              content: this.state.messageInput,
              date: new Date().getTime(),
              suser_id: 1
            }
        })
    }
    public state = {
        ws: null,
        messageInput: '',
        messageArray: [],
        myId: 0,
        selectUser: null
    }
    public handleSelectUser(other) {
        this.setState({
            selectUser: other
        })
    }
    public render() {
        const userObject = this.state.messageArray.reduce((total, value) => {
            value.suser_id == this.state.myId ? (
                total[value.user_id] == undefined ? total[value.user_id] = {
                    userinfo: value.user,
                    message: [value],
                    unreadNum: 0
                } : total[value.user_id].message = (() => {
                    total[value.user_id].message.push(value)
                    if(!value.is_read) {
                        total[value.user_Id].unreadNum = total[value.user_id].unreadNum + 1
                    }
                    return total[value.user_id].message.sort()
                })()
         ) : total[value.suser_id] == undefined ? total[value.suser_id] = {
            userinfo: value.suser,
            message: [value],
            unreadNum: 0
        } : total[value.suser_id].message = (() => {
            total[value.suser_id].message.push(value)
            if(!value.is_read) {
                total[value.suser_id].unreadNum = total[value.suser_id].unreadNum + 1
            }
            return total[value.suser_id].message.sort((a, b) => {
                return a.create_at < b.create_at 
            })
        })()
        return total
        }, {})
        const userArray = Object.keys(userObject).reduce((total, value) => {
            total.push({
                other: value,
                ...userObject[value]
            })
            return total
        }, []).sort((a, b) => {
            return Number(a[a.message.length - 1].create_at > b[b.message.length - 1].create_at)
        })
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
                    {
                        userArray.length == 0 
                        ? 
                        <div className="empty-user">
                            当前并没有人
                        </div> 
                        :
                        userArray.map((value, key) => {
                            return (<div key={key} className={ value.other == this.state.selectUser ? 'user-item-select' : 'user-item'} onClick={() => this.handleSelectUser(value.other)}>
                            <img src={ avator_default_jpg }/>
                            <div className="user-detail">
                                <div className="detail-top">
                                    <span className="detail-name">
                                        {value.userinfo.username}
                                    </span>
                                    <span className="detail-time">
                                        {moment(value.message[value.message.length - 1].create_at).format('YYYY-MM-DD')}
                                    </span>
                                </div>
                                <div className="detail-bottom">
                                    <span> {value.message[value.message.length - 1].content} </span>
                                    <span className="detail-num"> { '' || value.unreadNum }</span>
                                </div>
                            </div>
                        </div>)
                        })
                    }

                </div>
                {
                    this.state.selectUser == null ? 
                    <div className="right-content">
                        <div className="empty-messages"> 当前并没有选择对象 </div>
                    </div> 
                    :
                    <div className="right-content">
                        <div className="right-content-title">
                            <img src={ chatroom_btn_jpg } />
                            <span>{userObject[this.state.selectUser].userinfo.username}</span>
                        </div>
                        <div className="right-content-content">
                            {
                                userObject[this.state.selectUser].message.map((value, key) => {
                                    return (
                                        <div key = {key} className="message-item">
                                            <div className="item-time">
                                                { value.create_at }
                                            </div>
                                            {
                                                value.user_id !== this.state.myId ? 
                                                (
                                                    <div className="item-content-0">
                                                        <img src={ chatroom_btn_jpg } />
                                                        <div className="item-content-right">
                                                            <div className="title">
                                                                {value.user.username}
                                                            </div>
                                                            <div className="content-text">
                                                                {value.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                (
                                                    <div className="item-content-1">
                                                        <img src={ chatroom_btn_jpg } />
                                                        <div className="item-content-right">
                                                            <div className="title">
                                                                {value.suser.username}
                                                            </div>
                                                            <div className="content-text">
                                                                {value.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="send-message">
                            <div className="send-message-title">
                                好消息,好消息,请回复下好消息
                            </div>
                            <textarea placeholder="请回复一下" value={this.state.messageInput} onChange={(e) => this._handleTextValue(e)} />
                            <div className="send-message-bottom">                        
                                <div className="button" onClick={() => this.handleSendMessage()}>发送</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}