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
import { Post, TokenPost } from '@lib/helper'
import { withCookies } from 'react-cookie'
import { storeUserInfo } from '@store/actions/todoApp'

class MyInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    props
    uploadDom
    public switchUploadVideo(link) {
        history.replace(link)
    }
    public _handleUploadAvator() {
        this.uploadDom.click()
    }
    public handleUploadAvator(e) {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const url = 'upload/uploadImg'
        const form = new FormData()
        form.append('file', file)
        // 此处的file字段由上传的api决定，可以是其它值
        const xhr = new XMLHttpRequest()
        xhr.open('POST', url, true)  // 第三个参数为async?，异步/同步
        xhr.send(form)
        xhr.onload = async () => {
            //如果请求成功
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                const res = JSON.parse(xhr.responseText)
                if(res.success) {
                    const res2 = await TokenPost('auth/updateAvator', {
                        avatorId: res.result.id
                    })
                    if(!res2.success) {
                        alert('更改失败')
                    } else {
                        const { cookies }= this.props
                        cookies.set('userinfo', res2.result.userinfo, {
                            maxAge: 7*24*60*60
                        })
                        this.props.storeUserInfo(res2.result.userinfo)
                    }
                } else {
                    alert('上传失败')
                }
            }
        }
    }
    public render() {
        const userinfo = this.props.userinfo
        return (
            <div className="myinfo-component">
                <div className="info-title">
                    <img className="avator-img" src={ userinfo && userinfo.avator || avator_default_jpg} onClick={() =>this._handleUploadAvator()}/>
                    <input type="file" accept="image/png,image/gif" onChange={(e) => this.handleUploadAvator(e) }  ref={upload => this.uploadDom =upload} className="upload"/>
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
                            <span className="infodetailcontent" onClick={() => this.switchUploadVideo('personinfo?id=8')}>
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
const mapDispatchToProps = dispatch => ({
    storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo))
})
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(MyInfo))