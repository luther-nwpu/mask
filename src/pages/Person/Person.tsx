import * as React from 'react'
import './Person.scss'
import dynamic from '@assets/dynamic_btn_0.svg'
import histroyimg from '@assets/history_btn_3.svg'
import message from '@assets/message_btn_0.svg'
import subscription from '@assets/subscription_btn_0.svg'
import userinfo from '@assets/userinfo_btn_0.svg'
export class Person extends React.Component {
    public render() {
        return (
            <div className="person-component">
                <div className="person-content">
                    <div className="left">
                        <div className="title">
                            个人中心
                        </div>
                        <div className="item">
                            <img src={userinfo}/>
                           <div> 我的信息 </div>
                        </div>
                        <div className="item">
                            <img src={dynamic} />
                            <div> 我的动态 </div>
                        </div>
                        <div className="item">
                            <img src={subscription}/>
                            <div> 我的订阅 </div>
                        </div>
                        <div className="item">
                            <img src={histroyimg}/>
                            <div> 历史记录 </div>
                        </div>
                        <div className="item">
                            <img src={message} />
                            <div> 我的消息 </div>
                        </div>
                    </div>
                    <div className="right">
                    </div>
                </div>

            </div>
        )
    }   
}