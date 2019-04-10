import * as React from 'react'
import './ModifyNickName.scss'
import returnSvg from '@assets/return_btn_0.svg'
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'
import { storeUserInfo } from '@store/actions/todoApp'
import { TokenPost } from '@lib/helper'
import history from '@router'

class ModifyNickName extends React.Component {
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
            cookies.set('userinfo', res.result.userinfo, {
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
            <div className="modifynickname-component">
                <div className="title">
                    <img src={returnSvg} className="return-img" onClick={() => this.switchPerson()}/>
                    <span className="title-text"> 修改昵称 </span>
                </div>
                <div className="current-nickname">
                    当前昵称: <span className="bold"> {this.props.userInfo && this.props.userInfo.username} </span>
                </div>
                <div>
                    新昵称: <input className="new-nickname" placeholder="请输入新的昵称" value={this.state.nickNameInput} onChange={(e)=> this._handleChangeInput(e)}/>
                </div>
                <div>
                    <button onClick={() => this.changeNickName()}>
                        保存昵称
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

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ModifyNickName))