import * as React from 'react'
import './MyInfo.scss'
import { Sex } from '@config'
import woman from '@assets/woman_btn_0.svg'
import man from '@assets/man_btn_0.svg'
import edit from '@assets/edit_btn_0.svg'
import age from '@assets/icon_age.png'
import autograph from '@assets/icon_autograph.png'
import location from '@assets/icon_location.png'
import editInfo from '@assets/edit-information-icon.png'
import uploadVideo from '@assets/upload-video-icon.png'
import newPhone from '@assets/new_phone_icon.png'
import email from '@assets/email_icon.svg'
import history from '@router'

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
            email: '2424733678@qq.com',
            bindTelePhone: '18829589407'
        }
    }
    public switchUploadVideo(link) {
        history.replace(link)
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
                            <div className="editinfo" onClick={() => this.switchUploadVideo('personinfo?id=7')}>
                                <img src={edit} />
                                修改昵称
                            </div>
                        </div>
                        <div className="infocontent">
                            <img src={age} /> <span className="infocontent-text"> { this.state.userinfo.age } </span>
                            <img src={autograph} /> <span  className="infocontent-text"> { this.state.userinfo.location } </span>
                            <img src={location} /><span  className="infocontent-text"> { this.state.userinfo.autograph } </span>
                            <span className="infodetailcontent">
                                <img src = {editInfo} />
                                编辑资料
                            </span>
                        </div>
                    </div>
                </div>
                <div className="account-bind">
                    <div className="bind-title">
                        账号管理 <span className="bind-email"> (Email: {this.state.userinfo.email}) </span>
                    </div>
                    <div className="bind-detail">
                        <div className="item">
                            <div className="leftitem">                         
                                <img src={email} className="emailImg" />
                                <div className="leftdescription">
                                    修改绑定邮箱
                                    <div className="leftdetail">
                                        { `已绑定:${this.state.userinfo.email}` }
                                    </div>
                                </div>
                            </div>
                            <div className="goImg">
                            </div>                            
                        </div>
                        <div className="item">
                            <div className="leftitem">
                                <img src={newPhone} />
                                <div className="leftdescription">
                                    修改绑定手机
                                    <div className="leftdetail">
                                        { `已绑定:${this.state.userinfo.bindTelePhone}` }
                                    </div>
                                </div>
                            </div>
                            <div className="goImg">
                            </div>
                        </div>
                        <div className="item" onClick={() => this.switchUploadVideo('uploadfile')}>
                            <div className="leftitem">
                                <img src={uploadVideo} /> 
                                <div className="leftdescription">
                                    上传视频
                                    <div className="leftdetail">
                                        想要好嗨哟，那就赶紧上传视频吧
                                    </div>
                                </div>
                            </div>
                            <div className="goImg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}