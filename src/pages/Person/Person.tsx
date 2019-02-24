import * as React from 'react'
import './Person.scss'
import dynamic from '@assets/dynamic_btn_0.svg'
import histroyimg from '@assets/history_btn_3.svg'
import message from '@assets/message_btn_0.svg'
import subscription from '@assets/subscription_btn_0.svg'
import userinfo from '@assets/userinfo_btn_0.svg'
import { UserMenu } from '@config'
import { MyInfo, MyHistory, MyDynamic, MyMessage, MySubscription, MyVideo, MyDrafts } from '@components'
import video from '@assets/video_btn_0.svg'
export class Person extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabNum: UserMenu.MYUSERINFO
        }
    }
    public state = {
        tabNum: UserMenu.MYUSERINFO
    }
    public changeTabNum(value: any) {
        this.setState({ tabNum: value})
    }
    public rightelements = () => {
        switch(this.state.tabNum) {
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
            default:
                return null
        }
    }
    public render() {
        return (
            <div className="person-component">
                <div className="person-content">
                    <div className="left">
                        <div className="title">
                            个人中心
                        </div>
                        <div className={this.state.tabNum === UserMenu.MYUSERINFO ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYUSERINFO)}>
                            <img src={userinfo}/>
                            <div className="contentText"> 我的信息 </div>
                        </div>
                        <div className={this.state.tabNum === UserMenu.MYVIDEO ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYVIDEO)}>
                            <img src={video} />
                            <div className="contentText"> 我的视频 </div>
                        </div>
                        <div className={this.state.tabNum === UserMenu.MYDYNAMIC ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MYDYNAMIC)}>
                            <img src={dynamic} />
                            <div className="contentText"> 我的动态 </div>
                        </div>
                        <div className={this.state.tabNum === UserMenu.SUBSCRIPTION ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.SUBSCRIPTION)}>
                            <img src={subscription}/>
                            <div className="contentText"> 我的订阅 </div>
                        </div>
                        <div className={this.state.tabNum === UserMenu.HISTORY ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.HISTORY)}>
                            <img src={histroyimg}/>
                            <div className="contentText"> 历史记录 </div>
                        </div>
                        <div className={this.state.tabNum === UserMenu.MESSAGE ? 'item-select' : 'item' } onClick={() => this.changeTabNum(UserMenu.MESSAGE)}>
                            <img src={message} />
                            <div className="contentText"> 我的消息 </div>
                        </div>
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