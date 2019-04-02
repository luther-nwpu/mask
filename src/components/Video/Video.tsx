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
        video: document.getElementById('video'),
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
    public onload() {
        this.state.video.play()
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
                                <b className="now">00:00</b> / <b className="total">00:00</b>
                            </span>
                        </div>
                        <input/>
                        <div className="right">
                            <img src={ this.state.video && this.state.video.volume == 0 ? sound_svg : nosound_svg } className="sound-img" />
                            <span className="line"></span>
                            
                            <div className="current">
                                <div className="dot"></div>
                                <div className="cycle"></div>
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