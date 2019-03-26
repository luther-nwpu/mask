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
                <div className="showContainer">
                    <div className="container" style={{ left: `${this.state.left}px` }}>
                        {
                            this.state.thumbers.map((value) => {
                                return (<div className="dd"> <img src={value.imgUrl} /> </div>)
                            })
                        }
                    </div>
                </div>
                <div className="dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
                <div className="left-triangle triangle">
                    <span>&lt;</span>
                </div>
                <div className="right-triangle triangle">
                    <span>&gt;</span>
                </div>
            </div>
        )
    }
}