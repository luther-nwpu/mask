import * as React from 'react'
import './Video.scss'
import big_svg from '@assets/big_btn_0.svg'
import sound_svg from '@assets/sound_btn_0.svg'
import nosound_svg from '@assets/nosound_btn_0.svg'
import pause_svg from '@assets/pause_btn_0.svg'
import playing_svg from '@assets/playing_btn_0.svg'
import exit_full_svg from '@assets/exit_screen_btn_0.svg'
import Barrage from '@lib/barrage-ui/index'
import { connect } from 'react-redux'
import { displayAuth } from '@store/actions/auth'
import { AuthTab } from '@config'
import { Get } from '@lib/helper'
import { WebSocketType } from '@config'
import { Websocket } from '@lib/Websocket'
import { storeBarrages, pushBarrage } from '@store/actions/barrage'
import throttle from 'lodash/throttle'
import uuid from 'uuid'

interface IProp {
    id: string
}

enum Action {
    SENDMESSAGE = 'sendMessage',
    SENDBARRAGE = 'sendBarrage',
    RECEIVEMESSAGE = 'receiveMessage',
    RECEIVEBARRAGE = 'receiveBarrage'
}

class Video extends React.Component<IProp, any> {
    props: any
    video:any
    videoPlayer: any
    // 设置progress 的宽度
    processWidth: any
    processCurrentWidth: string
    progressDom: any
    bgDom: any
    soundWidth: string
    soundDom: any
    canvas: any
    controls: any

    public constructor(props) {
        super(props)
        this.AddBarrage = throttle(this.AddBarrage, 500)
    }

    public componentWillReceiveProps(props) {
        Promise.all([this.fetchGetVideo(props.id), this.fetchGetBarrages(props.id), this.fetchGetTunnelId(props.id)]).then(() => {
            let playPromise = this.video.play()
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                this.setState({})
              })
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
                this.video.muted = true
                this.video.play()
                this.setState({})
              })
            }
        })
        this.sendBarrageFromOtherComponenet(props.barrageContent)
        this.handleBarragesToObject(props.barrages)
    }

    public handleBarragesToObject(barrages) {
        if (barrages && barrages.length != this.props.barrages.length) {
            this.setState({
                barragesObject: barrages.reduce((total, value) => {
                    if(total[Math.floor(value.video_time)] == undefined) {
                        total[Math.floor(value.video_time)] = [value]
                    } else {
                        total[Math.floor(value.video_time)].push(value)
                    }
                    return total
                }, {})
            })
        }
    }

    public fetchGetBarrages(id) {
        if(id && this.props.id !== id) {
            Get('/api/barrage/getAllBarrageByVideoId', {
                videoId: id
            }).then((res) => {
                if(res.success) {
                    Promise.resolve('success')
                    this.props.storeBarrages(res.result)
                } else {
                    alert('你好出错了')
                }
                setTimeout(() => {
                    this.video.play()
                }, 1000)
            })
        }
    }

    public sendBarrageFromOtherComponenet(barrageContent) {
        if (barrageContent !== '' && this.props.barrageContent != barrageContent) {
            this.state.barragePlayer.add({
                key: uuid.v4(),
                time: 0,
                text: barrageContent,
                fontSize: Math.floor(Math.random()*10) + 20,
                color: this.getRandomColor()
            })
            this.state.barragePlayer.play()
            this.state.ws.sendMessage({
                action: Action.SENDBARRAGE,
                payload: {
                    text: barrageContent,
                    videoTime: this.video.currentTime,
                    fontColor: this.getRandomColor(),
                    fontSize: Math.floor(Math.random()*10) + 20
                }
            })
        }
    }

    public fetchGetVideo(id) {
        if(id && this.props.id !== id) {
            Get('/api/video/getVideoByVideoId', {
                videoId: id
            }).then((res) => {
                if(res.success) {
                    this.setState({
                        videoInfo: res.result
                    }, () => {                
                        Promise.resolve('success')
                    })
                } else {
                    alert('你好出错了')
                }
            })
        }
    }

    public fetchGetTunnelId(id) {
        if(id && this.props.id !== id) {
            Get('/api/socket/getTunnelId', {}).then((res) => {
                if(res.success) {
                    this.setState({
                        ws: new Websocket({type: WebSocketType.HAIYOU, haiyouId: id, tunnelId: res.result})
                    }, () => {                    
                        Promise.resolve('success')
                        this.state.ws.getWs().onmessage = (event) => {
                            const msg = JSON.parse(event.data)
                            switch(msg.action) {
                                case Action.RECEIVEBARRAGE:
                                    this.dealReceivebarrage(msg.payload)
                            }
                        }
                    })
                }
            })
        }
    }

    public dealReceivebarrage(barrage) {
        this.props.pushBarrage(barrage)
    }

    public state = {
        barragePlayer: null,
        ws: null,
        barragesObject: {},
        inputFocus: false,
        videoInfo: null,
        barrageInput: '',
        showControls: true,
        showTabControls: true
    }

    public componentDidMount() {
        this.video.ontimeupdate = () => this.updateVideo()
        this.progressDom.onmousedown = e => this.progress(e)
        this.soundDom.onmousedown = e => this.soundProgress(e)
        let timer = null
        let imouse = 0
        this.video.onclick = () => {
            this.playOrPause()
        }
        this.videoPlayer.onmouseover = () => {
            timer = setInterval(() => {
                if (imouse == 0) {
                    this.setState({
                        showControls: false
                    })
                }
                imouse = 0
            }, 2000)
        }
        this.videoPlayer.onmousemove = () => {
            imouse = 1
            this.setState({
                showControls: true
            })
        }
        this.videoPlayer.onmouseout = () => {
            clearInterval(timer)
            this.setState({
                showControls: false
            })
        }
        this.controls.onmouseover = () => {
            this.setState({
                showTabControls: true
            })
        }
        this.controls.onmouseout = () => {
            this.setState({
                showTabControls: false
            })
        }
        this.loadBarrage()
    }

    public loadBarrage() {
        this.setState({
            barragePlayer: new Barrage({
                container: this.videoPlayer, // 父级容器或ID
                data: [], // 弹幕数据
                config: {
                  // 全局配置项
                  duration: 20000, // 弹幕循环周期(单位：毫秒)
                  defaultColor: '#fff', // 弹幕默认颜色
                },
            })
        }, () => {
            this.state.barragePlayer.play()
        })
    }

    public getRandomColor() {
        return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6)
    }

    public AddBarrage() {
        this.state.barragesObject && this.state.barragesObject[Math.floor(this.video && this.video.currentTime)] && this.state.barragesObject[Math.floor(this.video && this.video.currentTime)].map((value) => {
            this.state.barragePlayer.add({
                key: value.key,
                time: (value.video_time - Math.floor(this.video && this.video.currentTime)) * 1000,
                text: value.text,
                fontSize: value.font_size,
                color: value.font_color
            })
        })
    }
    public updateVideo() {
        if (this.video && this.video.buffered.length) {
            this.AddBarrage()
            this.state.barragePlayer.play()
            let bufferEnd = this.video.buffered.end(this.video.buffered.length - 1)
            this.processWidth = (bufferEnd / this.video.duration) * this.progressDom.clientWidth + 'px'
            let offset = (this.video.currentTime / this.video.duration) * this.bgDom.clientWidth
            this.processCurrentWidth = offset + 'px'
            this.setState({})
        }
    }

    public onOffVolume() {
        if(this.video && this.video.muted) {
            this.video.muted = false
        } else {
            this.video.muted = true
        }
        this.setState({})
    }

    public progress(e) {
        let offset = e.offsetX / this.progressDom.offsetWidth
        this.video.currentTime = this.video.duration * offset
        this.setState({})
        document.onmousemove = (event) => {
            let offset = event.offsetX / this.progressDom.offsetWidth
            this.video.currentTime = this.video.duration * offset
            this.setState({})
            // 清除拖动 --- 防止鼠标已经弹起时还在拖动
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty()
        }   
        // 鼠标抬起停止拖动
        document.onmouseup = function(){
            document.onmousemove = null
        }
    }

    public soundProgress(e) {
        this.video.muted = false
        let offset = e.offsetX / 100
        this.video.volume = offset
        this.setState({})
        document.onmousemove = (event) => {
            let offset = event.offsetX / 100
            if(offset > 1) {
                offset = 1
            }
            this.video.volume = offset
            this.setState({})
            // 清除拖动 --- 防止鼠标已经弹起时还在拖动
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty()
        }   
        // 鼠标抬起停止拖动
        document.onmouseup = function(){
            document.onmousemove = null
        }
    }
    
    public getTimeStr(time) {
        let h:any = Math.floor(time / 3600)
        let m:any = Math.floor((time % 3600) / 60)
        let s:any = Math.floor(time % 60)
        h = h >= 10 ? h : '0' + h
        m = m >= 10 ? m : '0' + m
        s = s >= 10 ? s : '0' + s
        return h === '00' ? m + ':' + s : h + ':' + m + ':' + s
    }

    public playOrPause() {
        if(!(this.video.paused || this.video.ended || this.video.seeking || this.video.readyState < this.video.HAVE_FUTURE_DATA)) {
            this.video.pause()
        } else {
            this.video.play()
        }
        this.setState({})
    }

    public getVideoStateClassName() {
        if(this.video && this.video.paused) {
            return 'mark pause'
        } else if(this.video &&  this.video.seeking) {
            return 'mark loading'
        } else {
            return ''
        }
    }
    public isFullScreen() {
        return (
            document.fullscreen
        )
    }
    public full() {
        if (this.isFullScreen()) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        } else {
            if(this.videoPlayer.requestFullscreen){
                return this.videoPlayer.requestFullscreen()
            } else if(this.videoPlayer.webkitRequestFullScreen){
                return this.videoPlayer.webkitRequestFullScreen()
            } else if(this.videoPlayer.mozRequestFullScreen){
                return this.videoPlayer.mozRequestFullScreen()
            } else {
                return this.videoPlayer.msRequestFullscreen()
            }
        }
        this.setState({})
    }
    public continuePlay() {
        if(this.video && this.video.paused) {
            this.video.play()
            this.setState({})
        }
    }
    public handleLogin() {
        if (this.isFullScreen()) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        } 
        this.props.displayAuth(true, AuthTab.LOGIN)
    }
    public _handleSendBarrage(e) {
        this.setState({
            barrageInput: e.target.value
        })
    }
    public _handleInputFocus() {
        this.setState({
            inputFocus: true
        })
    }
    public _handleInputBlur() {
        this.setState({
            inputFocus: false
        })
    }
    public fetchSendBarrage() {
        this.state.barragePlayer.add({
            key: uuid.v4(),
            time: 0,
            text: this.state.barrageInput,
            fontSize: Math.floor(Math.random()*10) + 20,
            color: this.getRandomColor()
        })
        this.state.barragePlayer.play()
        this.state.ws.sendMessage({
            action: Action.SENDBARRAGE,
            payload: {
                text: this.state.barrageInput,
                videoTime: this.video.currentTime,
                fontColor: this.getRandomColor(),
                fontSize: Math.floor(Math.random()*10) + 20
            }
        })
        this.setState({
            barrageInput: ''
        })
    }
    public render() {
        const fullscreen = document.fullscreen
        const username =  this.props.userInfo && this.props.userInfo.username
        return (
            <div className="video-component">
                <div ref={(videoPlayer) => this.videoPlayer = videoPlayer} className="eplayer" style={{ cursor: (this.state.showControls || this.state.showTabControls) || !(this.video && !(this.video.paused || this.video.ended || this.video.seeking || this.video.readyState < this.video.HAVE_FUTURE_DATA)) ? 'inherit' : 'none' }}>
                    <video id="video" ref={(video) => this.video = video} className="video" src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/1500_a5a9fa0998476beed1d02aed4f5a79dc.mp4"></video>
                    <div className={(() => this.getVideoStateClassName())()} onClick={() => this.continuePlay()}></div>
                    <div className="controls" ref={(controls) => this.controls = controls} style={{display: (this.state.showControls || this.state.showTabControls) || !(this.video && !(this.video.paused || this.video.ended || this.video.seeking || this.video.readyState < this.video.HAVE_FUTURE_DATA)) ? 'inline-block' : 'none' }}>
                        <div className="progress" ref={(progress) => this.progressDom = progress}>
                            <b className="bg" ref={(bg) => this.bgDom = bg}></b>
                            <b className="buffer" style={{ width: this.processWidth }}></b>
                            <div className="current" style={{ width: this.processCurrentWidth }}>
                                <div className="dot"></div>
                                <div className="cycle"></div>
                            </div>
                        </div>
                        <div className="options">
                            <div className="left">
                                <img src={ this.video && !(this.video.paused || this.video.ended || this.video.seeking || this.video.readyState < this.video.HAVE_FUTURE_DATA) ? pause_svg : playing_svg } className="playing-img" onClick={ () => this.playOrPause() }/>
                                <span className="time">
                                    <b className="now"> {this.video && this.getTimeStr(this.video.currentTime) || '00:00'} </b> / <b className="total"> {this.video && this.getTimeStr(this.video.duration) || '00:00'}</b>
                                </span>
                            </div>
                            <div className="middle">
                                {
                                    username ? (<div className="send"> <input onFocus={() => this._handleInputFocus()} onBlur={() => this._handleInputBlur()} value={this.state.barrageInput} onChange={(e) => this._handleSendBarrage(e)}/> <button onClick={() => this.fetchSendBarrage()}> 发送 </button> </div>) : (<div> <span className="login" onClick={() => this.handleLogin() }>登录 </span>即可发弹幕 </div>)
                                }
                            </div>
                            <div className="right">
                                <img src={ this.video && this.video.muted ? nosound_svg : sound_svg } onClick={() => this.onOffVolume() } className="sound-img" />
                                <div className="sound-progress" ref={(sound) => this.soundDom = sound}>
                                    <span className="sound-line"></span> 
                                    <div className="sound-current" style={{width: ((this.video && this.video.muted == false && this.video.volume) || 0) * 100  + 'px'}}>
                                        <div className="sound-dot"></div>
                                        <div className="sound-cycle"></div>
                                    </div>
                                </div>                        
                                <img src={ fullscreen ? exit_full_svg : big_svg } className="big-img" onClick={() => this.full()}/>
                            </div>
                        </div>
                        <div className="epicon ep-video"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { userinfo } = state.todoApp
    const { barrages, barrageContent } = state.barrage
    return {
        userInfo: userinfo,
        barrages,
        barrageContent
    }
}

const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab)),
    storeBarrages: (barrages) => dispatch(storeBarrages(barrages)),
    pushBarrage: (barrage) => dispatch(pushBarrage(barrage))
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)