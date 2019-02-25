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
    public openSignTab = function() {
        this.state.openTab ? this.setState({openTab: false}) : this.setState({openTab: true})
        console.log(this.state.openTab)
    }
    public state = {
        openTab: false,
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
        labels: [
            '高兴',
            '伤心'
        ],
        one: '你好',
        two: '我不好',
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
                    <div className="video-title-info">
                        <span className="video-start">*</span> 类型
                    </div>
                    <input type="radio" /> 原创 <input type="radio" /> 转载
                    <div className="video-title-info">
                        <span className="video-start">*</span> 分区
                    </div>
                    <div className="drop-item" onClick={() => this.openSignTab()}>
                        {this.state.one} → {this.state.two} <div className={this.state.openTab ? 'drop-item-down' : 'drop-item-up'}> </div>
                        <div className="drop-item-content"> Hello World</div>
                    </div>
                    {/**
                        <select size={2} multiple></select>
                    */}
                    <div className="video-title-info">
                        <span className="video-start">*</span> 标签
                    </div>
                    <div className="label">
                        { 
                            this.state.labels.map(function(value) {
                                return (<div className="label-div"> {value} <span className="close"> × </span> </div>)
                            })
                        }
                        <input />
                    </div>
                    <div className="video-title-info">
                        简介
                    </div>
                    <textarea />
                </div>
            </div>
        )
    }
}