import * as React from 'react'
import './UploadVideoComponent.scss'
import uploadImg from '@assets/bg-upload-video.jpg'
import { connect } from 'react-redux'
import { uploadFirstFile } from '@store/actions/upload'
import { UploadState } from '@config'

class UploadVideoComponent extends React.Component {
    constructor(props) {
        super(props)
        this.props.uploadFile(UploadState.NOUPLOAD, null)
        document.addEventListener('dragover', function(e) {
            e.preventDefault()
            e.stopPropagation()
        })
        document.addEventListener('dragenter', function(e) {
            e.preventDefault()
            e.stopPropagation()
        })
        document.addEventListener('drop', function(e) {
            // 必须要禁用浏览器默认事件
            e.preventDefault()
            e.stopPropagation()
            const files = e.dataTransfer.files
            props.uploadFile(UploadState.UPLOADING, files[0])
        })
    }
    props
    public uploadVideo() {
        document.getElementById('uploadVideo').click()
    }
    public uploadFile(e) {
        this.props.uploadFile(UploadState.UPLOADING, e.target.files[0])
    }
    public render() {
        return (
            <div id="dashboard" className="upload-video-component">
                <img src={uploadImg} />
                <div className="upload-video" onClick={() => this.uploadVideo()}>
                    上传视频
                </div>
                <input id="uploadVideo" type="file" className="upload-input" onChange={(e) => this.uploadFile(e)}/>
                <div className="upload-text">
                    上传节目到好嗨哟，即表示你已经阅读并且同意遵守好嗨哟的<a>视频上传用户协议 </a>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFile: (uploadType, firstFile) => dispatch(uploadFirstFile(uploadType, firstFile))
})

export default connect(null, mapDispatchToProps)(UploadVideoComponent)