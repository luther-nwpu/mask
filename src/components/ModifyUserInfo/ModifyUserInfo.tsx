import * as React from 'react'
import './ModifyUserInfo.scss'
import returnSvg from '@assets/return_btn_0.svg'
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'
import { storeUserInfo } from '@store/actions/todoApp'
import { TokenPost } from '@lib/helper'
import history from '@router'

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
    public render() {
        return (
            <div className="modifyuserinfo-component">
                <div className="title">
                    <img src={returnSvg} className="return-img" onClick={() => this.switchPerson()}/>
                    <span className="title-text"> 编辑资料 </span>
                </div>
                <div className="item">
                    昵称：{this.props.userInfo && this.props.userInfo.username}
                </div>
                <div className="item">

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