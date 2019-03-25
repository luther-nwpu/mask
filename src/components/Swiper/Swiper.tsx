import * as React from 'react'
import './Swiper.scss'

export class Swiper extends React.Component {
    public state = {
        thumber: [
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            },
            {
                imgUrl: 'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
                title: '你好啊',
                imghref: 'https://dsadad'
            }
        ]
    }
    public render() {
        return (
            <div className="swiper-component">
                <div className="imgScroll">
                    <div className="showContainer">
                        <div className="container">
                            <img src="https://dimg02.c-ctrip.com/images/100b11000000qezw729A4_R_1600_10000_Mtg_7.jpg" alt="A cat" />
                            <img src="https://dimg05.c-ctrip.com/images/100u0x000000le38uA71D_R_1600_10000_Mtg_7.jpg" alt="A dog" />
                            <img src="https://dimg08.c-ctrip.com/images/100811000000qrlfxA3E0_R_1600_10000_Mtg_7.jpg" alt="dandelion" />
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
            </div>
        )
    }
}