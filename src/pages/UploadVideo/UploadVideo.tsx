import * as React from 'react'
import './UploadVideo.scss'
import uploadImg from '@assets/bg-upload-video.jpg'

export class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
    }
    public render() {
        return (
            <div className="upload-video-component">
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