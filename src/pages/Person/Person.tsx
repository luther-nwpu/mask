import * as React from 'react'
import './Person.scss'
import dynamic from '@assets/dynamic_btn_0.svg'
import histroyimg from '@assets/history_btn_3.svg'
import message from '@assets/message_btn_0.svg'
import subscription from '@assets/subscription_btn_0.svg'
import userinfo from '@assets/userinfo_btn_0.svg'
import { UserMenu } from '@config'
import { MyHistory, MyDynamic, MyMessage, MySubscription, MyVideo, MyDrafts } from '@components'
import MyInfo from '@components/Myinfo/MyInfo'
import ModifyNickName from '@components/ModifyNickName/ModifyNickName'
import ModifyUserInfo from '@components/ModifyUserInfo/ModifyUserInfo'
import video from '@assets/video_btn_0.svg'
import * as queryString from 'query-string'
import history from '@router'
import draft_svg from '@assets/draft_btn_0.svg'
import upload_btn_0 from '@assets/upload_btn_0.svg'

export class Person extends React.Component {
    constructor(props) {
        super(props)
        const search = queryString.parse(props.location.search)
        this.state = {
            tabNum: parseInt(search && search.id) || UserMenu.MYUSERINFO
        }
    }
    props: any
    public state = {
        tabNum: UserMenu.MYUSERINFO
    }
    public changeTabNum(value: any) {
        history.replace(`personinfo?id=${value}`)
    }
    public rightelements = () => {
        switch(parseInt(queryString.parse(this.props.location.search).id) || UserMenu.MYUSERINFO) {
            case UserMenu.MYUSERINFO:
                return (<MyInfo />)
            case UserMenu.HISTORY:
                return (<MyHistory />)
            case UserMenu.MESSAGE:
                return (<MyMessage />)
            case UserMenu.MYDYNAMIC:
                return (<MyDynamic />)
            case UserMenu.SUBSCRIPTION:
                return (<MySubscription />)
            case UserMenu.MYVIDEO:
                return (<MyVideo />)
            case UserMenu.MYDRAFTS: 
                return (<MyDrafts />)
            case UserMenu.MODIFYNICKBANE:
                return (<ModifyNickName />)
            case UserMenu.MODIFYUSERINFO:
                return (<ModifyUserInfo />)
            default:
                return null
        }
    }
    public switchToLink(link) {
        history.push(link)
    }
    public render() {
        const tabNum = parseInt(queryString.parse(this.props.location.search).id) || UserMenu.MYUSERINFO
        return (
            <div className="person-component">
                <div className="person-content">
                    <div className="left">
                        <div className="title">
                            个人中心
                        </div>
                        <div className={tabNum === UserMenu.MYUSERINFO ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYUSERINFO)}>
                            <img src={userinfo}/>
                            <div className="contentText"> 我的信息 </div>
                        </div>
                        <div className={tabNum === UserMenu.MYDRAFTS ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYDRAFTS)}>
                            <img src={draft_svg} />
                            <div className="contentText"> 我的草稿 </div>
                        </div>
                        <div className={tabNum === UserMenu.MYVIDEO ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYVIDEO)}>
                            <img src={video} />
                            <div className="contentText"> 我的视频 </div>
                        </div>
                        <div className={tabNum === UserMenu.MYDYNAMIC ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYDYNAMIC)}>
                            <img src={dynamic} />
                            <div className="contentText"> 我的动态 </div>
                        </div>
                        <div className={tabNum === UserMenu.SUBSCRIPTION ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.SUBSCRIPTION)}>
                            <img src={subscription}/>
                            <div className="contentText"> 我的订阅 </div>
                        </div>
                        <div className={tabNum === UserMenu.HISTORY ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.HISTORY)}>
                            <img src={histroyimg}/>
                            <div className="contentText"> 历史记录 </div>
                        </div>
                        <div className={tabNum === UserMenu.MESSAGE ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MESSAGE)}>
                            <img src={message} />
                            <div className="contentText"> 我的消息 </div>
                        </div>
                        <button className="upload" onClick={() => this.switchToLink('/uploadfile')}> <img src={ upload_btn_0 }/> 上传视频 </button>
                    </div>
                    <div className="right">
                    { 
                        this.rightelements()
                    }
                    </div>
                </div>
            </div>
        )
    }   
}