import * as React from 'react'
import { PureComponent } from 'react'
import { IResponse } from '@lib/helper'

interface Props {
    afterUpload: Function,
    onRef: Function
}

export class UploadFile extends PureComponent<Props, {}> {
    componentDidMount(){
        this.props.onRef(this)
    }
    xhr:XMLHttpRequest
    public state = {
        name: '',
        path: '',
        preview: null,
        data: null,
    }
    public changeName = (e: any) => {
        this.setState({ name: e.target.value })
    }
    public startUpload = () => {
        this.upload()
    }
    public changePath = (e: any) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        let src, preview, type = file.type
        if (/^image\/\S+$/.test(type)) {         // 匹配类型为image/开头的字符串
            src = URL.createObjectURL(file)
            preview = <img src={src} alt="" />
        } else if (/^video\/\S+$/.test(type)) {         // 匹配类型为video/开头的字符串
            src = URL.createObjectURL(file)
            preview = <video src={src} autoPlay={true} loop={true} controls={true} />
        } else if (/^text\/\S+$/.test(type)) {           // 匹配类型为text/开头的字符串
            const self = this
            const reader = new FileReader()
            reader.readAsText(file)
            // 注：onload是异步函数，此处需独立处
            reader.onload = function() {
               preview = <textarea value={this.result[0]} readOnly={true}/>
                self.setState({ path: file.name, data: file, preview })
            }
            return
        }
        this.setState({ path: file.name, data: file, preview })
    }
    // 上传文件
    public upload = async () => {
        const data = this.state.data
        if (!data) {
            return
        }
        // 此处的url应该是服务端提供的上传文件api
        const url = '/api/admin/upload'
        const form = new FormData()
        form.append('file', data)
        // 此处的file字段由上传的api决定，可以是其它值
        const xhr = new XMLHttpRequest()
        this.xhr = xhr
        xhr.upload.addEventListener('progress', this.uploadProgress, false)  // 第三个参数为useCapture?，是否使用事件捕获/冒泡
    
        // xhr.addEventListener('load',uploadComplete,false);
        // xhr.addEventListener('error',uploadFail,false);
        // xhr.addEventListener('abort',uploadCancel,false)
    
        xhr.open('POST', url, true)  // 第三个参数为async?，异步/同步
        xhr.send(form)
        const self = this 
        xhr.onload = function () {
            //如果请求成功
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                const res:IResponse = JSON.parse(xhr.responseText)
                if(res.success) {
                    self.props.afterUpload(res)
                } else {
                    alert('上传失败')
                }
            }
        }
    }
    uploadProgress = (e) => {
        if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100)
            this.setState({ progress: progress })
        }
    }
    
    componentWillUnmount() {
        this.xhr.upload.removeEventListener('progress', this.uploadProgress, false)
    }
    public render() {
        const { name, path, preview } = this.state
        return (
            <div>
                <h4>上传文件</h4>
                <div className="row">
                    <label>文件名称</label>
                    <input type="text" placeholder="请输入文件名" value={name} onChange={this.changeName} />
                </div>
                <div className="row">
                    <label>文件路径</label>
                    <div className="row-input">
                        <span>{path ? path : '请选择文件路径'}</span>
                        <input type="file" accept="video/*,image/*,text/plain" onChange={this.changePath} />
                    </div>
                </div>
                <div className="media">
                    {preview}
                </div>
                <button className="primary upload" onClick={this.upload}>上传</button>
            </div>
        )
    }
}
