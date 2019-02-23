import * as React from 'react'
import './UploadVideo.scss'
import uploadImg from '@assets/bg-upload-video.jpg'

export class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
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
            let reader = new FileReader()
            reader.readAsText(files[0], 'utf-8')
            reader.onload = function (evt) {
                console.log(evt)
            }
        })
    }
    public uploadVideo() {
        console.log('111')
    }
    public render() {
        return (
            <div id="dashboard" className="upload-video-component">
                <img src={uploadImg} />
                <div className="upload-video">
                    上传视频
                </div>
                <div className="upload-text">
                    上传节目到好嗨哟，即表示你已经阅读并且同意遵守好嗨哟的<a>视频上传用户协议 </a>
                </div>
            </div>
        )
    }
}