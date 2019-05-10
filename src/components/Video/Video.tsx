import * as React from 'react'
import './Video.scss'
import big_svg from '@assets/big_btn_0.svg'
import sound_svg from '@assets/sound_btn_0.svg'
import nosound_svg from '@assets/nosound_btn_0.svg'
import pause_svg from '@assets/pause_btn_0.svg'
import playing_svg from '@assets/playing_btn_0.svg'
import exit_full_svg from '@assets/exit_screen_btn_0.svg'
import Barrage from 'barrage-ui'
import { connect } from 'react-redux'
import { displayAuth } from '@store/actions/auth'
import { AuthTab } from '@config'
import { Get } from '@lib/helper'
import { WebSocketType } from '@config'
import { Websocket } from '@lib/Websocket'
import { storeBarrages } from '@store/actions/barrage'

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
    }

    public componentWillReceiveProps() {
        this.fetchGetVideo()
        this.fetchGetBarrages()
    }
    public fetchGetBarrages() {
        if(this.props.id) {
            Get('/barrage/getAllBarrageByVideoId', {
                videoId: this.props.id
            }).then((res) => {
                if(res.success) {
                    this.setState({
                        barrages: res.result
                    })
                } else {
                    alert('你好出错了')
                }
            })
        }
    }

    public fetchGetVideo() {
        if(this.props.id) {
            Get('/video/getVideoByVideoId', {
                videoId: this.props.id
            }).then((res) => {
                if(res.success) {
                    this.props.storeBarrages(res.result)
                } else {
                    alert('你好出错了')
                }
            })
        }
    }

    public fetchGetTunnelId() {
        if(this.props.id) {
            Get('/socket/getTunnelId', {}).then((res) => {
                if(res.success) {
                    this.setState({
                        ws: new Websocket({type: WebSocketType.CHAT, tunnelId: res.result})
                    }, () => {
                        this.state.ws.getWs().onmessage = (event) => {
                            console.log(event)
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

    public dealReceivebarrage(barrages) {
        console.log(barrages)
    }

    public state = {
        ws: null,
        inputFocus: false,
        videoInfo: null,
        barrageInput: '',
        showControls: true,
        showTabControls: true,
        barrage: {        
            barrageText: '',
            barrageColor: '',
            barrageRange: ''
        }
    }

    public handleBarrageText(event) {
        this.setState({barrage: { ...this.state.barrage, barrageText: event.target.value }})
    }

    public handleBarrageColor(event) {
        this.setState({barrage: { ...this.state.barrage, barrageColor: event.target.value }})
    }

    public handleBarrageRange(event) {
        this.setState({barrage: { ...this.state.barrage, barrageRange: event.target.value }})
    }

    public sendBarrage(e) {
        return false
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
        document.onkeydown = e => this.keydown(e)
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
        this.loadBarrage()
    }

    public loadBarrage() {
        const barrage = new Barrage({
            container: this.videoPlayer, // 父级容器或ID
            data: [
                {
                  'key': '7g43mm0rpp1l67eh6qjo8',
                  'time': 500,
                  'text': '绿色走一波',
                  'color': '#0f0',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'n8alq5l22d8qqbuhgst68g',
                  'time': 1200,
                  'text': '我膨胀了',
                  'fontFamily': 'SimSun',
                  'fontSize': 32,
                  'color': 'yellow',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'atb8ctt81egh8hf45u7n2g',
                  'time': 2500,
                  'text': '妈妈咪呀',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'bl9a602defoehsiahgi7vo',
                  'time': 3300,
                  'text': '富贵使我们相遇',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'p0su7gh4s88fjtqv0bmdog',
                  'time': 4000,
                  'text': '要想生活过得去',
                  'color': '#0f0',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'udfel3ppv5ggrfqo4nlbng',
                  'time': 4400,
                  'text': '你且在这里不要走动，待我去买两斤橘子',
                  'color': '#f00',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': '68ts93rle7gtv1i9die5ig',
                  'time': 4800,
                  'text': '我们都一样',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'dcprmrcmdcg4btqej0mung',
                  'time': 5200,
                  'text': 'Remember me',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': '9jgn02iii6b8qmkq2v2hg',
                  'time': 5680,
                  'text': 'LoL',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'im73i1lka0ooavb86gb048',
                  'time': 6600,
                  'text': '(-_-)|||',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'hrbvbcuekoqm7aacufgk8',
                  'time': 7200,
                  'text': '天哪噜',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'f95vsgh50qob6ip3r617b',
                  'time': 8300,
                  'text': '富强 民主 文明 和谐 自由 平等 公正 法治 爱国 敬业 诚信 友善',
                  'color': '#f00',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'u7bo393jvv8dkccb2ml0e',
                  'time': 9210,
                  'text': '啦啦啦啦啦啦啦拉',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'muafgllnsg20op35brg9',
                  'time': 10000,
                  'text': '我是谁 我从哪里来 我为什么要看这个',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'hjv3sllm12tbh85r2qor8',
                  'time': 12000,
                  'text': '2333333333333333',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'r7u5mvu1l7g1hk7cvnddig',
                  'time': 12000,
                  'text': '2333333333333333',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': '0o51j9psnj8qn3bnfq9kag',
                  'time': 12000,
                  'text': '2333333333333333',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                },
                {
                  'key': 'fkgm2nerakgr71jloi9d38',
                  'time': 12000,
                  'text': '2333333333333333',
                  'createdAt': '2019-01-13T13:34:47.126Z'
                }
              ], // 弹幕数据
            config: {
              // 全局配置项
              duration: 20000, // 弹幕循环周期(单位：毫秒)
              defaultColor: '#fff', // 弹幕默认颜色
            },
        })
        // 新增一条弹幕
        barrage.add({
            key: 'fctc651a9pm2j20bia8j', // 弹幕的唯一标识
            time: 1000, // 弹幕出现的时间(单位：毫秒)
            text: '这是新增的一条弹幕', // 弹幕文本内容
            fontSize: 24, // 该条弹幕的字号大小(单位：像素)，会覆盖全局设置
            color: '#0ff', // 该条弹幕的颜色，会覆盖全局设置
        })
        
        // 播放弹幕
        barrage.play()
    }
    public keydown(e) {
        if (e && e.keyCode == 37 && !this.state.inputFocus) this.video.currentTime -= 10
        if (e && e.keyCode == 39  && !this.state.inputFocus) this.video.currentTime += 10
        if ((e && e.keyCode == 32 || e.keyCode == 13)  && !this.state.inputFocus) this.playOrPause()

        this.setState({})
    }

    public updateVideo() {
        if (this.video.buffered.length) {
            let bufferEnd = this.video.buffered.end(this.video.buffered.length - 1)
            this.processWidth = (bufferEnd / this.video.duration) * this.progressDom.clientWidth + 'px'
            let offset = (this.video.currentTime / this.video.duration) * this.bgDom.clientWidth
            this.processCurrentWidth = offset + 'px'
            this.setState({})
        }
    }

    public onOffVolume() {
        if(this.video.muted) {
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
    public render() {
        const fullscreen = document.fullscreen
        const userId =  this.props.userInfo && this.props.userInfo.id
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
                                    userId ? (<div className="send"> <input onFocus={() => this._handleInputFocus()} onBlur={() => this._handleInputBlur()} value={this.state.barrageInput} onChange={(e) => this._handleSendBarrage(e)} onKeyDown={(e) => this.sendBarrage(e)}/> <button> 发送 </button> </div>) : (<div> <span className="login" onClick={() => this.handleLogin() }>登录 </span>即可发弹幕 </div>)
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
    const { barrages } = state.barrage
    return {
        userInfo: userinfo,
        barrages
    }
}

const mapDispatchToProps = dispatch => ({
    displayAuth: (isDisplay, authTab) => dispatch(displayAuth(isDisplay, authTab)),
    storeBarrages: (barrages) => dispatch(storeBarrages(barrages))
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)