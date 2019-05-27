import './Home.scss'
import React from 'react'
import { Swiper } from '@components'
const data = {
  imgArray: [
      require('./img/1.jpg'),
      require('./img/1.jpg'),
      require('./img/1.jpg'),
  ],
  linkArray: [
      'http://baidu.com',
      'http://baidu.com',
      'http://baidu.com',
  ],
  title:[
      '20城锦标赛冠军狭路相逢 抢夺北京决赛名额！',
      '爱网购的女人要注意了，现在知道还不晚！',
      '国务院：加快发展商业养老保险，完善社会保障体系，助力老有所养。',
      '专访《战神》制作人：为何新作变化如此之大？',
      'A股突围成功了，你的股票和基金会不会涨？丨周报'
  ],
  lunboObject: {
      'width':995,//幻灯片的宽度
      'height':335,//幻灯片的高度
      'imgWidth':690,//幻灯片第一帧的宽度
      'imgHeight': 500,
      'interval': 2000,//幻灯片滚动的间隔时间
      'scale':0.85, //记录显示比例关系
      'number':3,
      'autoPlay':true,
      'vertical':'center',  // center或者bottom,居中对齐或底部对齐
      'tweenString':'QuadEaseIn' // 运动方式，缓冲曲线
  }
}
const intervalTime = 2000
const transitionTime = '2s'
export class Home extends React.Component {
  render () {
    return (
      <div className="home-page">
        <div className="swiper">
          <Swiper lunboObject={data.lunboObject} imgArray={data.imgArray} title={data.title} linkArray={data.linkArray} />
        </div>
      </div>
    )
  }
}