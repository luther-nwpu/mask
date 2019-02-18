import * as React from 'react'
import './Person.scss'
import dynamic from '@assets/dynamic_btn_0.svg'
import histroyimg from '@assets/history_btn_3.svg'
import message from '@assets/message_btn_0.svg'
import subscription from '@assets/subscription_btn_0.svg'
import userinfo from '@assets/userinfo_btn_0.svg'
import { UserMenu } from '@config'
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
    public render() {
        return (
            <div className="person-component">
                <div className="person-content">
                    <div className="left">
                        <div className="title">
                            个人中心
                        </div>
                        <div className={this.state.tabNum === UserMenu.MYUSERINFO ? 'item-select' : 'item' }>
                            <img src={userinfo}/>
                            <div className="contentText"> 我的信息 </div>
                        </div>
                        <div className="item">
                            <img src={dynamic} />
                            <div className="contentText"> 我的动态 </div>
                        </div>
                        <div className="item">
                            <img src={subscription}/>
                            <div className="contentText"> 我的订阅 </div>
                        </div>
                        <div className="item">
                            <img src={histroyimg}/>
                            <div className="contentText"> 历史记录 </div>
                        </div>
                        <div className="item">
                            <img src={message} />
                            <div className="contentText"> 我的消息 </div>
                        </div>
                    </div>
                    <div className="right">
                    </div>
                </div>

            </div>
        )
    }   
}