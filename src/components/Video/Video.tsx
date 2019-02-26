import * as React from 'react'
import './Video.scss'
export class Video extends React.Component {
    public constructor(props) {
        super(props)
    }
    public state = {
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
    public render() {
        return (
            <div>
                <div>
                    <video controls width="720" height="480">
                        <source src="WeChat.mp4"></source>
                    </video>
                </div>
                <input type="text" value={this.state.barrage.barrageText} onChange={(e) => this.handleBarrageText(e)}/>
                <input type="text" value={this.state.barrage.barrageColor} onChange={(e) => this.handleBarrageColor(e)}/>
                <input type="range" value={this.state.barrage.barrageRange} min="20" max="40" onChange={(e) => this.handleBarrageRange(e)} />
                <button onClick={() => this.sendBarrage()}> 发送弹幕 </button>
            </div>
        )
    }
}