import * as React from 'react'
import './ModifyUserInfo.scss'
import returnSvg from '@assets/return_btn_0.svg'
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'
import { storeUserInfo } from '@store/actions/todoApp'
import { TokenPost } from '@lib/helper'
import history from '@router'
import edit from '@assets/edit_btn_0.svg'

class ModifyUserInfo extends React.Component {
    props: any
    constructor(props) {
        super(props)
    }
    public state = {
        nickNameInput: ''
    }
    public _handleChangeInput(e) {
        this.setState({
            nickNameInput: e.target.value
        })
    } 
    public async changeNickName() {
        const res = await TokenPost('auth/updateNickName', {
            nickName: this.state.nickNameInput
        })
        if(!res.success) {
            alert('更改失败')
        } else {
            const { cookies }= this.props
            cookies.set('userinfo', res.result, {
                maxAge: 7*24*60*60
            })
            this.props.storeUserInfo(res.result)        
            history.replace('personinfo')
        }
    }
    public switchPerson() {
        history.replace('personinfo')
    }
    public switchUploadVideo(link) {
        history.replace(link)
    }
    public render() {
        return (
            <div className="modifyuserinfo-component">
                <div className="title">
                    <img src={returnSvg} className="return-img" onClick={() => this.switchPerson()}/>
                    <span className="title-text"> 编辑资料 </span>
                </div>
                <div className="item">
                    <span className="item-title"> 昵称：</span>{this.props.userInfo && this.props.userInfo.username}
                    <div className="editinfo" onClick={() => this.switchUploadVideo('personinfo?id=7')}>
                        <img src={edit} />
                        修改昵称
                    </div>
                </div>
                <div className="item">
                    <span className="item-title">个性签名:</span> <textarea/>
                </div>
                <div className="item">
                    <span className="item-title">年龄：</span> <input type="number" />
                </div>
                <div className="item">
                    <span className="item-title">性别: </span><input type="radio"/> 男 <input type="radio"/> 女 <input type="radio"/> 保密
                </div>
                <div className="item">
                    <span className="item-title">位置: </span><input />
                </div>
                <div>
                    <button onClick={() => this.changeNickName()}>
                        保存
                    </button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { userinfo } = state.todoApp
    return {
        userInfo: userinfo
    }
}
const mapDispatchToProps = dispatch => ({
    storeUserInfo: (userInfo) => dispatch(storeUserInfo(userInfo))
})

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ModifyUserInfo))