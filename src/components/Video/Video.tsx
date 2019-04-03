import * as React from 'react'
import './Video.scss'
import big_svg from '@assets/big_btn_0.svg'
import sound_svg from '@assets/sound_btn_0.svg'
import nosound_svg from '@assets/nosound_btn_0.svg'
import pause_svg from '@assets/pause_btn_0.svg'
import playing_svg from '@assets/playing_btn_0.svg'

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
        console.log('video', this.video)
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
            console.log('不允许自动播放')
            console.log(error)
          })
        }
    }
    public componentDidCatch(error, info) {
        console.log(error)
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
        let offset = e.offsetX / document.getElementById('progress').offsetWidth
        this.state.video.currentTime = this.state.video.duration * offset
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
            return 'mark loading'
        } else if(this.video &&  this.video.seeking) {
            return 'mark loading'
        } else {
            return ''
        }
    }
    public render() {
        return (
            <div className="video-component">
                <div className="eplayer">
                    <video ref={(video) => this.video = video} className="video" src={this.props.src}></video>
                    <div className={(() => this.getVideoStateClassName())()}></div>
                    <div className="controls">
                        <div className="progress" >
                            <b className="bg"></b>
                            <b className="buffer"></b>
                            <div className="current">
                                <div className="dot"></div>
                                <div className="cycle"></div>
                            </div>
                        </div>
                        <div className="options">
                            <div className="left">
                                <img src={ this.video && !(this.video.paused || this.video.ended || this.video.seeking || this.video.readyState < this.video.HAVE_FUTURE_DATA) ? pause_svg : playing_svg } className="playing-img" onClick={ () => this.playOrPause() }/>
                                <span className="time">
                                    <b className="now">00:00 {this.video && this.video.playing} </b> / <b className="total">00:00</b>
                                </span>
                            </div>
                            <input/>                
                            <div className="right">
                                <img src={ this.video && this.video.muted ? nosound_svg : sound_svg } onClick={() => this.addVolume() } className="sound-img" />
                                <div className="sound-progress">
                                    <span className="line"></span> 
                                    <div className="current">
                                        <div className="dot"></div>
                                        <div className="cycle"></div>
                                    </div>
                                </div>                        
                                <img src={big_svg} className="big-img"/>
                            </div>
                        </div>
                        <div className="epicon ep-video"></div>
                    </div>
                </div>
            </div>
        )
    }
}