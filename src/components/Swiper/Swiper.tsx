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
                <div className="wrap">
                    <div className="cube">
                        <div className="out_front">
                            <img src="https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg" className="pic" />
                        </div>
                        <div className="out_back">
                            <img src="https://img-blog.csdn.net/20170716094334594" className="pic" />
                        </div>
                        <div className="out_left">
                            <img src="https://img-blog.csdn.net/20170716094400013" className="pic" />
                        </div>
                        <div className="out_right">
                            <img src="https://img-blog.csdn.net/20170716094422331" className="pic" />
                        </div>
                        <div className="out_top">
                            <img src="https://img-blog.csdn.net/20170716094444434" className="pic" />
                        </div>
                        <div className="out_bottom">
                            <img src="https://img-blog.csdn.net/20170716094504432" className="pic" />
                        </div>
                        <span className="in_front">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                        <span className="in_back">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                        <span className="in_left">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                        <span className="in_right">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                        <span className="in_top">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                        <span className="in_bottom">
                            <img src="https://img-blog.csdn.net/20170716120759718" className="in_pic" />
                        </span>
                    </div>

                </div>
    </div>
        )
    }
}