import * as React from 'react'
import './Drafts.scss'
import videoImg from '@assets/download-video.png'
import downloadSuccess from '@assets/download-success.png'
const processStyle = {
    width: '100%',
    height: '1px',
    background: '#43ce5b'
}

export class Drafts extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        uploadVideos: [{
            videoId: 0,
            videoName: '高兴的睡不着了',
            videoUrl: '',
            uploadPercent: '50%',
        },{
            videoId: 1,
            videoName: '你好啊',
            videoUrl: '',
            uploadPercent: '50%'
        }]
    }
    public render () {
        return (
            <div className="drafts-component">
                <div className="drafts-content">
                    <div>
                        <span className="file-title">文件上传 </span> （视频上传必须是mp4, avi, flv 格式）
                    </div>
                    <div className="file-description">
                        {
                            this.state.uploadVideos.map(function(value) {
                                return (<div className="file-detail"><img src={videoImg} /> <div className="file-upload"> <div className="file-video-name"><span> {value.videoName} </span> <span className="upload-right"> <span className="file-delete"> 删除 </span> <img src={downloadSuccess} /> </span> </div><div className="upload-percent"> 上传成功 </div> <div style={ processStyle }></div> </div> </div>)
                            })
                        }
                    </div>
                    <div>

                    </div>
                    <div>
                        基本信息（*为必填项）
                    </div>
                    <div>
                        视频封面
                    </div>
                    <div>
                        标题* <input />
                    </div>
                    <div>
                        类型* <input type="radio" /> 原创 <input type="radio" /> 转载 <input /> 
                    </div>
                    <div>
                        分区
                        <div>
                            <input />
                        </div>
                    </div>
                    <div>
                        标签
                    </div>
                    <div>
                        简介
                        <div>
                            <input />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}