import * as React from 'react'
import './MyMessage.scss'
export class MyMessage extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        messageArray: [
            {
                userid: 0,
                userName: 'Luther',
                userAvator: '121',
                messageArray: [
                    {
                        content: '',
                        is_me: true
                    }
                ]
            }
        ]
    }
    public render() {
        return (
            <div className="message-component">
                <div className="left-user">

                </div>
                <div className="right-content">

                </div>
            </div>
        )
    }
}