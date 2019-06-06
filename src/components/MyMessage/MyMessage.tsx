import * as React from 'react'
import './MyMessage.scss'
import avator_default_jpg from '@assets/avator_default.jpg'
import chatroom_btn_jpg from '@assets/chatroom_btn_0.jpg'
import { Websocket } from '@lib/Websocket'
import { TokenGet, tryCatch } from '@lib/helper'
import { WebSocketType } from '@config'
import moment from 'moment'
import { withCookies, Cookies } from 'react-cookie'
import { connect } from 'react-redux'
import { clearFirstUser } from '@store/actions/chat'
enum Action {
    SENDMESSAGE = 'sendMessage',
    SENDBARRAGE = 'sendBarrage',
    RECEIVEMESSAGE = 'receiveMessage',
    RECEIVEBARRAGE = 'receiveBarrage'
}

class MyMessage extends React.Component {
    chatContent: any
    constructor(props) {
        super(props)
    }
    props
    public async componentWillMount() {
        this.fetchGetTunnelId()
        this.fecthGetChatByMe()
    }
    public fetchGetTunnelId() {
        TokenGet('/api/socket/getTunnelId').then(res=> {
            if(res.success) {
                this.setState({
                    ws: new Websocket({type: WebSocketType.CHAT, tunnelId: res.result})
                }, () => {
                    this.state.ws.getWs().onmessage = (event) => {
                        const msg = JSON.parse(event.data)
                        switch(msg.action) {
                            case Action.RECEIVEMESSAGE:
                                this.dealReceiveMessage(msg.payload)
                        }
                    }
                })
            }
        }).catch(err => {
            alert(err)
        })
    }
    public fetchReadMyChat() {
        TokenGet('/api/chat/readMyChat').then(res => {
            if(res.success) {
                this.setState({
                    messageArray: res.result.allMessage,
                    myId: res.result.myId           
                })
            }
        })
    }
    public dealReceiveMessage(payload) {
        this.state.messageArray.push(payload)
        this.setState({
            messageArray: this.state.messageArray
        }, () => {
            this._sliderContent()
        })
    }
    public fecthGetChatByMe() {
        TokenGet('/api/chat/getAllChatByMe').then(res => {
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
    public _sliderContent() {
        this.chatContent.scrollTop = this.chatContent.scrollHeight
    }
    public handleSendMessage() {
        this.props.clearFirstUser()
        this.state.ws.sendMessage({
            action: Action.SENDMESSAGE,
            payload: {
              content: this.state.messageInput,
              date: new Date().getTime(),
              suser_id: 1
            }
        })
        this.setState({
            messageInput: ''
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
        }, () => {
            this._sliderContent()
        })
    }
    public render() {
        const userinfo = this.props.userinfo
        const userObject = this.state.messageArray.reduce((total, value) => {
            value.suser_id == this.state.myId ? (
                total[value.user_id] == undefined ? total[value.user_id] = {
                    userinfo: value.user,
                    message: [value],
                    unreadNum: 0
                } : total[value.user_id].message = (() => {
                    if(!value.is_read) {
                        total[value.suser_id].unreadNum = total[value.suser_id].unreadNum + 1
                    }
                    total[value.user_id].message.push(value)
                    return total[value.user_id].message.sort()
                })()
         ) : total[value.suser_id] == undefined ? total[value.suser_id] = {
            userinfo: value.suser,
            message: [value],
            unreadNum: 0
        } : total[value.suser_id].message = (() => {
            total[value.suser_id].message.push(value)
            return total[value.suser_id].message.sort((a, b) => {
                return a.create_at < b.create_at 
            })
        })()
        return total
        }, {})
        const userArray = Object.keys(userObject).reduce((total, value) => {
            if(this.props.firstUser && this.props.firstUser.id != value) {    
                total.push({
                    other: value,
                    ...userObject[value]
                })
            }
            return total
        }, []).sort((a, b) => {
            return Number(a[a.message.length - 1].create_at > b[b.message.length - 1].create_at)
        })
        if(this.props.firstUser) {
            userArray.unshift(userObject[this.props.firstUser.id] || { other: this.props.firstUser.id, message: [], unreadNum: 0 })
        }
        return (
            <div className="message-component">
                <div className="left-user">
                    <div className="left-user-title">
                        <img src ={ userinfo.avator || chatroom_btn_jpg } /> 
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
                                    <span className={ value.unreadNum == 0 ? 'no-num' : 'detail-num' }> { value.unreadNum == 0 ? '' : value.unreadNum }</span>
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
                        <div ref={(chatContent) => this.chatContent = chatContent } className="right-content-content">
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

const mapStateToProps = (state) => {
    const { userinfo } = state.todoApp
    const { user } = state.chat
    return {
        userinfo: userinfo,
        firstUser: user
    }
}
const mapDispatchToProps = dispatch => ({
    clearFirstUser: () => dispatch(clearFirstUser())
})

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(MyMessage))