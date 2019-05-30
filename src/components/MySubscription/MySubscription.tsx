import * as React from 'react'
import './MySubscription.scss'
import { TokenGet, TokenPost } from '@lib/helper'
import avator_default_jpg from '@assets/avator_default.jpg'
import history from '@router'
import empty_subscribe_svg from '@assets/subscribe_btn_3.svg'
export class MySubscription extends React.Component {
    constructor(props: any) {
        super(props)
    }
    public componentWillMount() {
        this.fetchGetAllSubscribe()
    }

    public fetchGetAllSubscribe() {
        TokenGet('/api/subscribe/getAllSubscribeByMe').then((res) => {
            if(res.success) {
                this.setState({
                    subscribeUsers: res.result
                })
            }
        })
    }

    public state = {
        subscribeUsers: []
    }

    public handleUnSubscribe(e, id) {
        e.stopPropagation()
        TokenPost('/api/subscribe/unSubscribeUser', {
            subscriberId: id
        }).then((res) => {
            if(res.success) {
                this.setState({
                    subscribeUsers: res.result
                })
            } else {
                alert('请求出错')
            }
        })
    }

    public switchToUser(userId) {
        history.push(`/haiyouUser/${userId}`)
    }

    public render() {
        return (
            <div className="mysubscription-component">
                {
                    this.state.subscribeUsers.length == 0 ? (
                        <div className="empty-subscribe">
                            <img src={empty_subscribe_svg} />
                            <span className="text"> 您当前并没有订阅用户。 </span>
                        </div>
                    ) : ''
                }
                {
                    this.state.subscribeUsers.map((value, key) => {
                        return (
                            <div key = { key } className="subscribe-item" onClick={ () => this.switchToUser(value.suser_id) }>
                                <img src={ avator_default_jpg } />
                                <div className="item-description">
                                    <div className="username">
                                        { value.suser && value.suser.username }
                                    </div>
                                    <div className="signature">
                                        { value.suser && value.suser.signature || '您当前并没有签名' }
                                    </div>
                                    <div className="item-bottom">
                                        订阅者： { value.subscribeCount }
                                        <span onClick={(e) => this.handleUnSubscribe(e, value.id)} className="unsubscribe-btn"> 取消订阅 </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}