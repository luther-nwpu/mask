import * as React from 'react'
import './Video.scss'
import big_svg from '@assets/big_btn_0.svg'
import sound_svg from '@assets/sound_btn_0.svg'
import nosound_svg from '@assets/nosound_btn_0.svg'
import pause_svg from '@assets/pause_btn_0.svg'
import playing_svg from '@assets/playing_btn_0.svg'
import exit_full_svg from '@assets/exit_screen_btn_0.svg'

interface IProp {
    src: string,
    type?: any
}
interface IState {
    video: any,
    barrage: {        
        barrageText: '',
        barrageColor: '',
        barrageRange: ''
    }
}

export class Video extends React.Component<IProp, IState> {
    props: IProp
    video:any
    videoPlayer: any
    // 设置progress 的宽度
    processWidth: any
    processCurrentWidth: string
    progressDom: any
    bgDom: any
    soundWidth: string

    public constructor(props) {
        super(props)
    }

    public state: IState = {
        video: '',
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

    public sendBarrage() {
        console.log(this.state.barrage.barrageText)
    }

    public componentDidMount() {
        this.video.ontimeupdate = () => this.updateVideo()
        this.progressDom.onmousedown = e => this.progress(e)
        document.onkeydown = e => this.keydown(e)
        let playPromise = this.video.play()
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
            console.log(_)
            this.setState({})
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            this.video.muted = true
            let playPromise = this.video.play()
            playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                this.video.muted = false
                this.setState({})
            })
            
            this.setState({})
          })
        }
    }

    public keydown(e) {
        if (e && e.keyCode == 37) this.video.currentTime -= 10
        if (e && e.keyCode == 39) this.video.currentTime += 10
        if (e && e.keyCode == 32) this.videoPlayer.play()
        this.setState({})
        return false
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
    
    public addVolume() {
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
    public render() {
        const fullscreen = document.fullscreen
        return (
            <div className="video-component">
                <div ref={(videoPlayer) => this.videoPlayer = videoPlayer} className="eplayer">
                    <video ref={(video) => this.video = video} className="video" src={this.props.src}></video>
                    <div className={(() => this.getVideoStateClassName())()} onClick={() => this.continuePlay()}></div>
                    <div className="controls">
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
                            <input/>                
                            <div className="right">
                                <img src={ this.video && this.video.muted ? nosound_svg : sound_svg } onClick={() => this.addVolume() } className="sound-img" />
                                <div className="sound-progress">
                                    <span className="sound-line"></span> 
                                    <div className="sound-current" style={{width: (this.video && this.video.volume || 0) * 100  + 'px'}}>
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