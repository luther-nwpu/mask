import * as React from 'react'
import './MyHistory.scss'
import { TokenGet, TokenPost } from '@lib/helper'
import draft_default_png from '@assets/draft_default_btn_0.jpg'
import moment from 'moment'
import history_empty_svg from '@assets/history_btn_2.svg'
import history from '@router'
export class MyHistory extends React.Component {
    constructor(props: any) {
        super(props)
    }

    public componentWillMount() {
        this.fetchGetAllHistoryByMe()
    }

    public fetchGetAllHistoryByMe() {
        TokenGet('/api/history/getAllHistoryByMe').then((res) => {
            if(res.success) {
                this.setState({
                    historyArr: res.result
                })
            }
        })
    }

    public fetchDeleteHistory(id) {
        TokenPost('/api/history/deleteHistoryById', {
            id
        }).then((res) => {
            if(res.success) {
                this.setState({
                    historyArr: res.result
                })
            }
        })
    }

    public switchToHaiyou(id) {
        history.push(`/haiyou/${id}`)
    }

    public state = {
        historyArr: []
    }

    public render() {
        const historyOrderArr = this.state.historyArr.sort((a, b) => {
            return a.update_at - b.update_at
        })
        return (
            <div className="myhistory-component">
                {
                    this.state.historyArr.length == 0 ?
                    (
                        <div className="empty-history">
                            <img src ={ history_empty_svg } />
                            <div className="text"> 您当前还并没有浏览过视频 </div>
                        </div>
                    ) : ''
                }
                {
                    historyOrderArr.map((value, key) => {
                        return (
                            <div key={key} className="history-item" onClick={() => this.switchToHaiyou(value.id)}>
                                <img src = {draft_default_png} />
                                <div className="item-bottom">
                                    <div className="item-title">
                                        { value.haiyou.title }
                                    </div>
                                    <div className="item-time">
                                        { moment(value.update_at).format('YYYY-MM-DD-hh:mm:ss') } 
                                    </div>
                                </div>
                                <div className="close-img" onClick={() => this.fetchDeleteHistory(value.id)}></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}