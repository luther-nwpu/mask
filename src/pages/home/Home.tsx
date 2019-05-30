import './Home.scss'
import React from 'react'
import { Swiper } from '@components'
import index_svg from '@assets/index_btn_0.svg'
import game_svg from '@assets/game_btn_0.svg'
import life_svg from '@assets/life_btn_0.svg'
import happy_svg from '@assets/happy_btn_0.svg'
import video_svg from '@assets/video_btn_1.svg'
import music_svg from '@assets/music_btn_0.svg'
import technology_svg from '@assets/technology_btn_0.svg'
import animation_svg from '@assets/animation_btn_0.svg'
import fashion_svg from '@assets/fashion_btn_0.svg'
import fandrama_svg from '@assets/fandrama_btn_0.svg'
import record_svg from '@assets/record_btn_0.svg'
import ghost_svg from '@assets/ghost_btn_0.svg'
import digital_svg from '@assets/digital_btn_0.svg'
import ads_svg from '@assets/ads_btn_0.svg'
import tvseries_svg from '@assets/tvseries_btn_0.svg'
import movie_svg from '@assets/movie_btn_0.svg'
import country_svg from '@assets/country_btn_0.svg'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import watch_svg from '@assets/watch_btn_0.svg'

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
  getRandomColor () {
    return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6)
  }
  render () {
    return (
      <div className="home-page">
        <div className="swiper">
          <Swiper lunboObject={data.lunboObject} imgArray={data.imgArray} title={data.title} linkArray={data.linkArray} />
        </div>
        <div className="category">
          <div className="category-title">
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={index_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                首页
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={game_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                游戏
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={life_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                生活
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={happy_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                娱乐
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={video_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                影视
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={music_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                音乐
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={technology_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                科技
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={digital_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                数码
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={animation_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                动画
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={fashion_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                时尚
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={fandrama_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                番剧
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={record_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                记录片
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={ghost_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                鬼畜
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={ads_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                广告
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={country_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                国创
              </div>
            </div>           
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={tvseries_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                电视剧
              </div>
            </div>
            <div className="category-item">
              <div className="icon">
                <img className="index_svg" src={movie_svg}/>
              </div>
              <div className="title" style={{color: this.getRandomColor()}}>
                电影
              </div>
            </div>
          </div>
        </div>
        
        <div className="home-content">
            <div className="content-item">
              <div className="item-title">
                <img src={game_svg} className="img-class" />
                <span className="text-class"> 游戏 </span>
                <span className="right-content"> 一种7000个视频</span>
              </div>
              <div className="videos-content">
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
                  <div className="video-item">
                      <img src={draft_default_png} className="draft-img" />
                      <div className="video-title" style={{ color: this.getRandomColor()}}>
                        { 'haiyou, 不能为空的哦' }
                      </div>
                      <div className="video-detail" style={{ color: this.getRandomColor() }}>
                          <div className="label">
                              { /*value && value.label.split('_').join(' ') */ 'No No No Label' }
                          </div>
                          <div className="watch">
                              <img className="watch-img" src={ watch_svg } />
                              { /* value && value.hot*/ 0}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}