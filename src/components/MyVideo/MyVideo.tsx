import * as React from 'react'
import './MyVideo.scss'
import emptySvg from '@assets/empty_btn_0.svg'
import barrageSvg from '@assets/barrage_btn_0.svg'
import commentSvg from '@assets/comment_btn_0.svg'
import playSvg from '@assets/play_btn_0.svg'
import switchSvg from '@assets/switch_btn_0.svg'
import { TokenGet } from '@lib/helper'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import moment from 'moment'

export class MyVideo extends React.Component {
    constructor(props: any) {
        super(props)
    }
    public state = {
        videos: []
    }
    public componentWillMount() {
        TokenGet('/api/haiyou/getAllHaiyou').then((res) => {
            if(res.success) {
                this.setState({
                    videos: res.result.map((value) => {
                        return {
                            id: value.id,
                            picture: value.select_picture && value.select_picture.url,
                            category: value.partition && value.partition.split('_').join(' ') || '当前并未分类',
                            time: moment(value.update_at).format('YYYY-MM-DD'),
                            label: value.label && value.label.split('_').join(' ') || '当前并无标签',
                            name: value.title
                        }
                    })   
                })
            }
        })
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
                                <img src={value.picture || draft_default_png } className="avator" />
                                <div className="right-description">
                                    <div className="first"> 
                                        <div className="category"> { value.category } </div>
                                        <div className="title"> {value && value.name || '当前并未填写title'} </div> 
                                    </div>
                                    <div className="second">
                                        <div className="time">
                                            {value && value.time}
                                        </div>
                                        <div className="line">
                                        </div>
                                        <div className="label">
                                            {value && value.label}
                                        </div>
                                        <button> 编辑 </button>
                                    </div>
                                    <div className="third">
                                        <img src={playSvg} className="play" />
                                        {'0'}
                                        <img src={barrageSvg} />
                                        {'0'}
                                        <img src={commentSvg} />
                                        {'0'}
                                        <img src={switchSvg} />
                                        {'0'}
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