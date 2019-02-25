import * as React from 'react'
import './Drafts.scss'
import videoImg from '@assets/download-video.png'
import downloadSuccess from '@assets/download-success.png'
import coverImg from '@assets/video-img.png'
import selectImg from '@assets/select-img-btn.png'
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
        }],
        videoImgs: [
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
            'https://pub-static.haozhaopian.net/static/web/site/features/cn/crop/images/crop_20a7dc7fbd29d679b456fa0f77bd9525d.jpg',
        ]
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
                                return (<div className="file-detail">
                                            <img src={videoImg} /> 
                                            <div className="file-upload"> 
                                                <div className="file-video-name">
                                                    <span> {value.videoName} </span> 
                                                    <span className="upload-right"> 
                                                        <span className="file-delete"> 删除 </span> 
                                                        <img className="file-finish-img" src={downloadSuccess} /> 
                                                    </span> 
                                                </div>
                                                <div className="upload-percent"> 上传成功 </div> 
                                                <div style={ processStyle }></div> 
                                            </div> 
                                        </div>)
                            })
                        }
                    </div>
                    <div className="add-upload-video">
                       + 添加视频
                    </div>
                    <div className="line"></div>
                    <div className="base-info">
                        基本信息
                    </div>
                    <div className="video-cover">
                        <span className="video-cover-text">视频封面</span> <span>（格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600） </span>
                    </div>
                    <div className="cover-img">
                        <div className="cover-img-left"> <img src={coverImg} /> <div className="right-bottom"> 上传图片 </div> </div>
                        <div className="cover-img-right">
                            <div className="cover-img-right-text"> 可选择以下封面 </div>
                            <div className="cover-img-right-imgs">
                                {
                                    this.state.videoImgs.map(function(value) {
                                        return (<div className="cover-img-right-imgs-value"><img src={value} /> <div className="select-img"> <img src={selectImg} /> </div> </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="video-title-info">
                        <span className="video-start">*</span> 标题 
                    </div>
                    <input type="text"/>
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