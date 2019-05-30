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
        locationInput: '',
        signatureInput: '',
        ageInput: '',
        sexInput: '2'
    }
    public async changeNickName() {
        const res = await TokenPost('/api/auth/updateUserInfo', {
            location: this.state.locationInput,
            age: this.state.ageInput,
            sex: this.state.sexInput,
            signature: this.state.signatureInput
        })
        if(!res.success) {
            alert('更改失败')
        } else {
            const { cookies }= this.props
            cookies.set('userinfo', res.result.userinfo, {
                maxAge: 7*24*60*60
            })
            this.props.storeUserInfo(res.result.userinfo)        
            history.replace('personinfo')
        }
    }
    public switchPerson() {
        history.replace('personinfo')
    }
    public switchUploadVideo(link) {
        history.replace(link)
    }
    public _handleLocationInput(e) {
        this.setState({
            locationInput: e.target.value
        })
    }
    public _handleAgeInput(e) {
        this.setState({
            ageInput: e.target.value
        })
    }
    public _handleSignatureInput(e) {
        this.setState({
            signatureInput: e.target.value
        })
    }
    public _handleSexInput(str) {
        this.setState({
            sexInput: str
        })
    }
    public componentDidMount() {
        this.setState({
            sexInput: this.props.userInfo && this.props.userInfo.sex
        })
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
                    <span className="item-title">个性签名:</span> <textarea placeholder={this.props.userInfo && this.props.userInfo.signature} value={this.state.signatureInput} onChange={(e) => this._handleSignatureInput(e)}/>
                </div>
                <div className="item">
                    <span className="item-title">年龄：</span> <input placeholder={this.props.userInfo && this.props.userInfo.age} type="number" value={this.state.ageInput} onChange={(e) => this._handleAgeInput(e)} />
                </div>
                <div className="item">
                    <span className="item-title">性别: </span><input type="radio" onChange={() => this._handleSexInput('0')} checked = { this.state.sexInput == '0'}/> 男 <input type="radio" onChange={() => this._handleSexInput('1')} checked = { this.state.sexInput == '1'}/> 女 <input type="radio"  onChange={() => this._handleSexInput('2')} checked = { this.state.sexInput == '2'}/> 保密
                </div>
                <div className="item">
                    <span className="item-title">位置: </span><input placeholder={this.props.userInfo && this.props.userInfo.location} value={this.state.locationInput} onChange={(e)=>this._handleLocationInput(e) }/>
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