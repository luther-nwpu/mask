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
import { connect } from 'react-redux'
import avator_default_jpg from '@assets/avator_default.jpg'

class MyInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    props
    public switchUploadVideo(link) {
        history.replace(link)
    }
    public render() {
        const userinfo = this.props.userinfo
        console.log('userinfo', userinfo)
        return (
            <div className="myinfo-component">
                <div className="info-title">
                    <img className="avator-img" src={ userinfo && userinfo.avator || avator_default_jpg}/>
                    <div className="rightuserinfo">
                        <div className="infodetail">
                            <div className="nicksex">
                                { userinfo && userinfo.username }
                                <img src={ userinfo && userinfo.sex === Sex.MAN ? man : woman }/>
                            </div>
                            <div className="editinfo" onClick={() => this.switchUploadVideo('personinfo?id=7')}>
                                <img src={edit} />
                                修改昵称
                            </div>
                        </div>
                        <div className="infocontent">
                            <img src={age} /> <span className="infocontent-text"> { userinfo && userinfo.age || '20岁' } </span>
                            <img src={autograph} /> <span  className="infocontent-text"> { userinfo && userinfo.location || '火星' } </span>
                            <img src={location} /><span  className="infocontent-text"> { userinfo && userinfo.signature || '您并没有签名'} </span>
                            <span className="infodetailcontent">
                                <img src = {editInfo} />
                                编辑资料
                            </span>
                        </div>
                    </div>
                </div>
                <div className="account-bind">
                    <div className="bind-title">
                        账号管理 <span className="bind-email"> (Email: {userinfo && userinfo.email}) </span>
                    </div>
                    <div className="bind-detail">
                        <div className="item">
                            <div className="leftitem">                         
                                <img src={email} className="emailImg" />
                                <div className="leftdescription">
                                    修改绑定邮箱
                                    <div className="leftdetail">
                                        { `已绑定:${userinfo && userinfo.email}` }
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
                                        { `已绑定:${userinfo && userinfo.telePhone}` }
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

const mapStateToProps = (state) => {
    const { userinfo } = state.todoApp
    return {
        userinfo: userinfo
    }
}

export default connect(mapStateToProps, null)(MyInfo)