import * as React from 'react'
import './MySubscription.scss'
import { TokenGet } from '@lib/helper'
import avator_default_jpg from '@assets/avator_default.jpg'
export class MySubscription extends React.Component {
    constructor(props: any) {
        super(props)
    }
    public componentWillMount() {
        this.fetchGetAllSubscribe()
    }

    public fetchGetAllSubscribe() {
        TokenGet('/subscribe/getAllSubscribeByMe').then((res) => {
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

    public render() {
        return (
            <div className="mysubscription-component">
                {
                    this.state.subscribeUsers.map((value) => {
                        return (
                            <div className="subscribe-item">
                                <img src={ avator_default_jpg } /> 
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}