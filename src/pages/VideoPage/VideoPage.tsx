import * as React from 'react'
import './VideoPage.scss'
import Video from '@components/Video/Video'
import support from '@assets/follow-btn-0.svg'
import alreadtySupport from '@assets/follow-btn-1.svg'
import * as _ from 'lodash'
import { Get, TokenPost, TokenGet } from '@lib/helper'
import { displayAuth } from '@store/actions/auth'
import { connect } from 'react-redux'
import { AuthTab } from '@config'

class VideoPage extends React.Component {
    public state = {
        textareaInput: '',
        replyInput: '',
        comments: [],
        selectReply: null,
        haiyou: null,
        selectVideo: 0,
    }
    props
    public constructor(props) {
        super(props)
    }
    public _handleChangeReplyInput(e) {
        this.setState({
            replyInput: e.target.value
        })
    }
    public fetchGetAllComment() {
        Get('/comment/getAllCommentsByHaiyouId', {
            id: this.props.match.params.id
        }).then((res) => {
            if(!res.success) {
                alert('系统出现故障')
            } else {
                this.setState({
                    comments: res.result
                })
            }
        })
    }
    handleSendComment() {
        TokenPost('/comment/sendComment', {
            content: this.state.textareaInput,
            haiyouId: this.props.match.params.id
        }).then((res) => {
            if(res.success) {      
                this.setState({
                    textareaInput: '',
                    comments: res.result
                })
            } else {
                alert('发送失败')
            }
        })
    }
    async componentWillMount() {
        this.fetchGetAllComment()
        this.getHaiyou()
    }
    _handleChangeTextArea(e) {
        this.setState({      
            textareaInput: e.target.value  
        })
    }
    getHaiyou() {
        Get('/haiyou/getHaiyouById', {
            haiyouId: this.props.match.params.id
        }).then((res) => {
            if(res.success) {
                this.setState({
                    haiyou: res.result
                })
            }
        })
    }
    handleLogin() {
        this.props.displayAuth(true, AuthTab.LOGIN)
    }
    handleRegister() {
        this.props.displayAuth(true, AuthTab.REGISTER)
    }
    public _handleClickReply(key) {
        this.setState({
            replyInput: '',
            selectReply: key
        })
    }
    public handleReplyComment() {
        TokenPost('/comment/sendSubComment', {
            commentId: this.state.comments[this.state.selectReply.key].id,
            content: this.state.replyInput,
            suserId: this.state.comments[this.state.selectReply.key].user.id,
            haiyouId: this.props.match.params.id
        }).then((res) => {
            if(!res.success) {
                alert('系统出现故障')
            } else {
                this.setState({
                    comments: res.result
                }, () => {
                    this.setState({
                        selectReply: null
                    })
                })
            }
        })
    }
    public handleReplySubComment() {
        TokenPost('/comment/sendSubComment', {
            commentId: this.state.comments[this.state.selectReply.key].id,
            content: this.state.replyInput,
            suserId: this.state.comments[this.state.selectReply.key].subComments[this.state.selectReply.key1].user.id,
            haiyouId: this.props.match.params.id
        }).then((res) => {
            if(!res.success) {
                alert('系统出现故障')
            } else {
                this.setState({
                    comments: res.result
                }, () => {
                    this.setState({
                        selectReply: null
                    })
                })
            }
        })
    }
    public handleSelectVideo(key) {
        this.setState({
            selectVideo: key
        })
    }
    public render() {
        return(
            <div className="videopage-component">
                <div className="left-video">
                    <div className="video-main">
                        <div className="video-title">
                            {this.state.haiyou && this.state.haiyou.title}
                        </div>
                        <div className="video-description">
                            <span>
                                {
                                    this.state.haiyou && this.state.haiyou.partition.split('_').join('>')
                                }
                            </span>
                            <span className="time">
                                { this.state.haiyou && this.state.haiyou.create_at}
                            </span>
                        </div>
                        <div className="video-play-detail">
                            <span>
                                { '399' } 次播放
                            </span>
                            <span className="barrage"> 一共有 {'2313' } 条弹幕</span>
                        </div>
                        <div className="video-video">
                            <div className="video-tab">
                                {
                                    this.state.haiyou && this.state.haiyou.videoArr.map((value, key) => {
                                        return (
                                            <div key={key} className="tab" onClick={() => this.handleSelectVideo(key)}>
                                                <div className={ this.state.selectVideo == key ? 'tab-select' : `tab-text`}>
                                                    <div className="dd">
                                                        { value.name.length > 3 ? value.name.slice(0, 3) + ' ...' : value.name }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <Video id={this.state.haiyou && this.state.haiyou.videoArr[this.state.selectVideo].id}></Video>
                        </div>
                    </div>
                    <div className="video-comments">
                        <span className="title"> 全部评论({this.state.comments.length}) </span>
                        <div className="comment-send">
                            <img src=""/>
                            <textarea value={this.state.textareaInput} onChange={(e) => this._handleChangeTextArea(e)}/>
                            <button onClick={() => this.handleSendComment()}>
                                发表评论
                            </button>
                        </div>
                        {
                            this.state.comments.length !== 0 ?                                 
                                this.state.comments.map((value, key) => {
                                    return (
                                        <div className="comment" key = {key}>
                                            <img src="dsadsa" />
                                            <div className="comment-content">
                                                <div className="comment-username">
                                                    {value.user.username}
                                                </div>
                                                <div className="comment-text">
                                                    {value.content}
                                                </div>
                                                <div className="comment-bottom">
                                                    <span className="comment-index"> #  {key + 1} </span>
                                                    <span className="comment-time"> {value.create_at} </span>
                                                    <div className="like"></div>
                                                    <span className="like-num"> 7 </span>
                                                    <div className="unlike"></div>
                                                    <span className="unlike-num">10</span>
                                                    <span className="comment-reply" onClick={() => this._handleClickReply({ type: 'comment', key: key, key1: null })}>回复</span>
                                                </div>
                                                <div className="sub-comments">
                                                    {
                                                        this.state.selectReply && this.state.selectReply.type == 'comment' && this.state.selectReply.key == key 
                                                        ? (                                                    
                                                        <div className="sub-comment">
                                                            <div className="line"></div>
                                                            <div className="sub-comment-content">
                                                                <img src="" />
                                                                <div className="sub-comment-description">
                                                                    <div className="username">
                                                                        <span className="send">我</span>
                                                                        <span>回复</span>
                                                                        <span className="receive">{this.state.comments[this.state.selectReply.key].user.username}</span>
                                                                        :
                                                                    </div>
                                                                    <div className="sub-comment-content">
                                                                        <input type="text" value={this.state.replyInput} onChange={(e) => this._handleChangeReplyInput(e)} placeholder="请说出你想diss她的话"/>
                                                                        <button onClick={() => this.handleReplyComment()}> 回复 </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        ) :
                                                        ''
                                                    }
                                                    {
                                                        value.subComments.map((value1, key1) => {
                                                            return (
                                                                <div key = {key1}>
                                                                    <div className="sub-comment">
                                                                        <div className="line"></div>
                                                                        <div className="sub-comment-content">
                                                                            <img src="" />
                                                                            <div className="sub-comment-description">
                                                                                <div className="username">
                                                                                    <span className="send">{value1.user.username}</span>
                                                                                    <span>回复</span>
                                                                                    <span className="receive">{value1.suser.username}</span>
                                                                                    :
                                                                                </div>
                                                                                <div className="sub-content">
                                                                                    {value1.content}
                                                                                </div>
                                                                                <div className="sub-comment-bottom">
                                                                                    <span className="comment-index"> #  {key1 + 1} </span>
                                                                                    <span className="comment-time"> {value1.create_at} </span>
                                                                                    <div className="like"></div>
                                                                                    <span className="like-num"> 7 </span>
                                                                                    <div className="unlike"></div>
                                                                                    <span className="unlike-num">10</span>
                                                                                    <span className="comment-reply" onClick={() => this._handleClickReply({ type: 'subcomment', key: key, key1: key1 })}>回复</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        this.state.selectReply && this.state.selectReply.type == 'subcomment' && this.state.selectReply.key == key && this.state.selectReply.key1 == key1
                                                                        ? (                                                    
                                                                        <div className="sub-comment">
                                                                            <div className="line"></div>
                                                                            <div className="sub-comment-content">
                                                                                <img src="" />
                                                                                <div className="sub-comment-description">
                                                                                    <div className="username">
                                                                                        <span className="send">我</span>
                                                                                        <span>回复</span>
                                                                                        <span className="receive">{this.state.comments[this.state.selectReply.key].user.username}</span>
                                                                                        :
                                                                                    </div>
                                                                                    <div className="sub-comment-content">
                                                                                        <input type="text" value={this.state.replyInput} onChange={(e) => this._handleChangeReplyInput(e)} placeholder="请说出你想diss她的话"/>
                                                                                        <button onClick={() => this.handleReplySubComment()}> 回复 </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        ) :
                                                                        ''
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                })
                            : 
                            (
                                <div className="no-comment">
                                    当前并无评论
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="right-user">
                    <div className="user-detail">
                        <img src ={this.state.haiyou && this.state.haiyou.user.avator} className="avator" />
                        <div className="user-detail-description">
                            <span className="username"> { this.state.haiyou && this.state.haiyou.user.username }</span><span className="send-message"> <span>发消息</span></span> <span></span>
                            <div>
                                { this.state.haiyou && this.state.haiyou.user.signature }
                            </div>
                            <div className="follow">
                                <img src={support}/> 订阅 | {this.state.haiyou && this.state.haiyou.followNum}
                            </div>
                        </div>
                    </div>
                    <div className="video-barrage">
                        <div className="barrage-title">
                            弹幕列表
                        </div>
                        <div className="barrages">
                            <div className="barrage-table">
                                <span>时间</span>
                                <span>弹幕内容(10)</span>
                                <span> 发送时间 </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                            <div className="barrage">
                                <span>
                                    10:11
                                </span>
                                <span>
                                    我喜欢你啊
                                </span>
                                <span>
                                    dsadsafhjasfj
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="video-input">
                        {
                            true ? (
                                <div className="barrage-input">
                                    <input />
                                    <button>发送</button>
                                </div>
                            ) : (
                                <div>
                                    <span className="login-text" onClick={() => this.handleLogin()}> 登录 </span>
                                    或
                                    <span className="register-text" onClick={() => this.handleRegister()}> 注册 </span>
                                    即可发送弹幕
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userinfo } = state.todoApp
    return {
        userInfo: userinfo
    }
}

const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab))
})

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage)