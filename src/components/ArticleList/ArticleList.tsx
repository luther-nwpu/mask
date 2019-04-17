import * as React from 'react'
import { Get } from '@lib/helper'
import './ArticleList.scss'
import history from '@router'
export class ArticleList extends React.Component {
  public state = {
    text: '',
    articles: [
      // 数据类型
      // {
      //   article_img: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
      //   article_title: '张露最帅',
      //   article_description: '你好啊safsadafhhhajk发撒合法化降幅达发撒激发飞机扩大解放hafdafj发的范德萨链接发会计法很疯狂half杀了发放煎熬了客户发发两份合法发的沙发康复护理肌肤萨勒夫的哈放大非击打还得看发发发发发发打打飞机啦啊啊啊啊反反复复烦烦烦烦烦烦发生纠纷啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊方法啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊按时发放冯方法好好好好好好好好好好好好哈佛户籍卡凤凰大厦空间发哈就发哈给反倒是卡号发给哈根饭卡发货的卡省高法开发咖妃考完·方式卡号发开发和反攻大陆幅度较大联发科大撒法科技孵化拉法兰符合很舒服lf卡拉返回拉萨刚刚ffsfhafdsafasndi内地飒回复分散发表发掘和发掘的话发哈就发哈回复哈空间和时间奥卡福蛤科发设计开发萨克封杀汉口分行大飒飒放假啊咖啡机哈尽快发哈啊啊啊啊啊',
      //   article_time: '2017年9月10日',
      // }
    ],
  }
  public constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    this.getAllArticles()
  }
  public async getAllArticles() {
    const res = await Get('/api/blog/getAllArticles', {})
    const result = res.result
    this.setState({ articles: result.reduce((arr, value) => {
        arr.push({
          article_id: value.article_id,
          article_title: value.title,
          article_img: `http://localhost:10011/${value.picture.picture_url}`,
          article_time: value.update_at,
          article_description: value.description
        })
        return arr
      }, [])
    })
  }
  public switchArticleDetail(articleId:string) {
    history.push(`/article/${articleId}`)
  }
  public render() {
    return (
      <div className="artilcelist-app">
        <div className="articles">
          {
            this.state.articles.map((item, key) => {
              return <div key={key} className="articles-item" onClick={() => this.switchArticleDetail(item.article_id)}>    
                        <img className="articles-item-img" src={item.article_img}/>
                        <div className="articles-item-detail">
                          <div className="articles-item-detail-title">
                            <div className="articles-item-detail-title-text">
                              {item.article_title}
                            </div>
                            <div className="articles-item-detail-title-time">
                              {item.article_time}
                            </div>
                          </div>
                          <div className="articles-item-detail-description">
                            <p>{item.article_description}</p>
                          </div>
                          <div className="articles-item-detail-bottom">
                            <img className="svg-size" src={require('@assets/comment.svg')}/>
                            5
                            <img className="svg-size" src={require('@assets/support.svg')}/>
                            6
                          </div>
                        </div>
                    </div>
            })
          }
        </div>
      </div>
    )
  }
}
