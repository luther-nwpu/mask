import * as React from 'react'
import './Person.scss'
export class Person extends React.Component {
    public render() {
        return (
            <div className="person-component">
                <div className="left">
                    <div>
                        个人中心
                    </div>
                    <div>
                        我的信息
                    </div>
                    <div>
                        我的动态
                    </div>
                    <div>
                        我的订阅
                    </div>
                    <div>
                        历史记录
                    </div>
                    <div>
                        我的消息
                    </div>
                </div>
                <div className="right">

                </div>
            </div>
        )
    }   
}