import * as React from 'react'
import './MyInfo.scss'
import { Sex } from '@config'
import woman from '@assets/woman_btn_0.svg'
import man from '@assets/man_btn_0.svg'
import edit from '@assets/edit_btn_0.svg'
export class MyInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        userinfo: {
            avator: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1550510853565&di=4eddd8436a89c3e19043946f3e7fa8ed&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Feac4b74543a982265bd540e38782b9014b90ebda.jpg',
            nickname: 'Grack track',
            sex: Sex.MAN,
            location: '火星',
            age: '20岁',
            autograph: '我',
            bindTelePhone: '18829589407'
        }
    }

    public render() {
        return (
            <div className="myinfo-component">
                <div className="info-title">
                    <img className="avator-img" src={this.state.userinfo.avator}/>
                    <div className="rightuserinfo">
                        <div className="infodetail">
                            <div className="nicksex">
                                { this.state.userinfo.nickname }
                                <img src={ this.state.userinfo.sex === Sex.MAN ? man : woman }/>
                            </div>
                            <div className="editinfo">
                                <img src={edit} />
                                修改昵称
                            </div>
                        </div>
                        <div>
                            { this.state.userinfo.age }
                            { this.state.userinfo.location }
                            { this.state.userinfo.autograph }
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        修改绑定手机
                    </div>
                </div>
            </div>
        )
    }
}