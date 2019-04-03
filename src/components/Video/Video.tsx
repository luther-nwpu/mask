import * as React from 'react'
import './Video.scss'
import big_svg from '@assets/big_btn_0.svg'
import sound_svg from '@assets/sound_btn_0.svg'
import nosound_svg from '@assets/nosound_btn_0.svg'
interface IProp {
    src: string
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
        const video: any = document.getElementById('video')
        video.play()
        this.setState({video: video}, () => {
            console.log('state', this.state.video)
        })
    }
    public addVolume() {
        if(this.state.video.muted) {
            this.state.video.muted = false
        } else {
            this.state.video.muted = true
        }
        this.setState({})
    }
    public render() {
        return (
            <div className="video-component">
                <div className="eplayer">
                    <video id="video" className="video" src={this.props.src}></video>
                    <div className="mark loading"></div>
                    <div className="controls">
                        <div className="progress">
                        <b className="bg"></b>
                        <b className="buffer"></b>
                        <div className="current">
                            <div className="dot"></div>
                            <div className="cycle"></div>
                        </div>
                    </div>
                    <div className="options">
                        <div className="left">
                            <i className="epicon ep-play is-play"></i>
                            <span className="time">
                                <b className="now">00:00 </b> / <b className="total">00:00</b>
                            </span>
                        </div>
                        <input/>                
                        <div className="right">
                            <img src={ this.state.video.muted ? nosound_svg : sound_svg } onClick={() => this.addVolume() } className="sound-img" />
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
                    </div>
                    <div className="epicon ep-video"></div>
                </div>
            </div>
        )
    }
}