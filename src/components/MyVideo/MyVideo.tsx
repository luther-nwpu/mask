import * as React from 'react'
import './MyVideo.scss'
import emptySvg from '@assets/empty_btn_0.svg'
import barrageSvg from '@assets/barrage_btn_0.svg'
import commentSvg from '@assets/comment_btn_0.svg'
import playSvg from '@assets/play_btn_0.svg'
import switchSvg from '@assets/switch_btn_0.svg'

export class MyVideo extends React.Component {
    constructor(props: any) {
        super(props)
    }
    public state = {
        videos: [{
            id: '1',
            name: 'ddddddddd',
            picture: 'da',
            category: 'dsad dsada'
        }, {
            id: '1',
            name: 'ddddddddd',
            picture: 'da',
            category: 'dsad dsada'
        }]
    }
    public render() {
        return (
            <div className="myvideo-component">
                {
                    this.state.videos.length == 0 
                    ?
                    (<div className="empty-video">
                        <img className="empty-img" src={emptySvg} />
                        <span>当前并没有Haiyou</span>
                    </div>) 
                    :
                    this.state.videos.map((value, key) => {
                        return (
                            <div className="item" key={key}>
                                <img src={value.picture} className="avator" />
                                <div className="right-description">
                                    <div className="first"> 
                                        <div className="category"> dsadsa dsadsad </div>
                                        <div className="title"> {value.name} </div> 
                                    </div>
                                    <div className="second">
                                        <div className="time">
                                            2---121
                                        </div>
                                        <div className="line">
                                        </div>
                                        <div className="label">
                                            label
                                        </div>
                                        <button> 编辑 </button>
                                    </div>
                                    <div className="third">
                                        <img src={playSvg} className="play" />
                                        {'dsa'}
                                        <img src={barrageSvg} />
                                        {'dsa'}
                                        <img src={commentSvg} />
                                        {'dsa'}
                                        <img src={switchSvg} />
                                        {'dsa'}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}