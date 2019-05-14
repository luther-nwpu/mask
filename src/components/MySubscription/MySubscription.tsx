import * as React from 'react'
import './MySubscription.scss'
import { TokenGet } from '@lib/helper'
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
            <div>
            </div>
        )
    }
}