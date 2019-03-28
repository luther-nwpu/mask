import * as React from 'react'
import './Swiper.scss'

export class Swiper extends React.Component {
    public state = {
        thumbers: [
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'https://img0.sc115.com/uploads/sc/jpgs/05/xpic6813_sc115.com.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'http://img.mp.itc.cn/upload/20170602/73b39bdd3f664793b74e78fc9e244384_th.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            }
        ],
        left: 0,
        timer: null
    }
    constructor(props) {
        super(props)
        this.autoPlay()
    }
    public autoPlay = function() {
        this.setState({    
            timer: setInterval(() => {
                this.nextPic()
            },1000)
        })
    }
    public nextPic = function() {
        let newLeft
        if(this.state.left === -600 * (this.state.thumbers.length - 1)){
            newLeft = 0
        }else{
            newLeft = this.state.left - 600
        }
        this.setState({
            left: newLeft
        })
    }
    public prevPic = function() {
        let newLeft
        if(this.state.left === 0){
            newLeft = -2400
        }else{
            newLeft = this.state.left + 600
        }
        this.setState({
            left: newLeft
        })
    }

    public render() {
        return (
            <div className="swiper-component">
                <div className="container">
                    <div className="cube-wrap">
                            <input type="radio" name="cuber" className="controller" id="1" checked />
                            <input type="radio" name="cuber" className="controller" id="2" />
                            <input type="radio" name="cuber" className="controller" id="3" />
                            <input type="radio" name="cuber" className="controller" id="4" />
                            <input type="radio" name="cuber" className="controller" id="5" />
                            <input type="radio" name="cuber" className="controller" id="6" />
                            <div className="cube">
                                <div className="cube-face front"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                                <div className="cube-face back"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                                <div className="cube-face left"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                                <div className="cube-face right"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                                <div className="cube-face top"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                                <div className="cube-face bottom"><img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" /></div>
                            </div>
                            <div className="cube_left">
                                <label htmlFor="6" className="cube_action"></label>
                                <label htmlFor="1" className="cube_action"></label>
                                <label htmlFor="2" className="cube_action"></label>
                                <label htmlFor="3" className="cube_action"></label>
                                <label htmlFor="4" className="cube_action"></label>
                                <label htmlFor="5" className="cube_action"></label>
                            </div>
                            <div className="cube_right">
                                <label htmlFor="2" className="cube_action"></label>
                                <label htmlFor="3" className="cube_action"></label>
                                <label htmlFor="4" className="cube_action"></label>
                                <label htmlFor="5" className="cube_action"></label>
                                <label htmlFor="6" className="cube_action"></label>
                                <label htmlFor="1" className="cube_action"></label>
                            </div>
                            <div className="indicators">
                                <label htmlFor="1" className="indicator"></label>
                                <label htmlFor="2" className="indicator"></label>
                                <label htmlFor="3" className="indicator"></label>
                                <label htmlFor="4" className="indicator"></label>
                                <label htmlFor="5" className="indicator"></label>
                                <label htmlFor="6" className="indicator"></label>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}