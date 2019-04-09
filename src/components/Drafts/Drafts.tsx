import * as React from 'react'
import './Drafts.scss'
import videoImg from '@assets/download-video.png'
import downloadSuccess from '@assets/download-success.png'
import coverImg from '@assets/video-img.png'
import selectImg from '@assets/select-img-btn.png'
import { connect } from 'react-redux'
const processStyle = {
    width: '100%',
    height: '1px',
    background: '#43ce5b'
}

class Drafts extends React.Component {

    xhr:XMLHttpRequest
    constructor(props) {
        super(props)
        console.log(props.firstFile)
        if(props.firstFile !== null) {
            const url = 'upload/firstvideo'
            const form = new FormData()        
            form.append('file', props.firstFile)
            this.state.uploadVideos.push({
                videoId: 0,
                videoName: props.firstFile.name.split('.')[0],
                videoUrl: '',
                uploadState: {
                  percent: '',
                  total: 0,
                  loaded: 0
                }
            })
            const addIndex = this.state.uploadVideos.length - 1
            const xhr = new XMLHttpRequest()
            this.xhr = xhr
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100)
                    console.log('process', progress)
                    this.state.uploadVideos[addIndex].uploadState = {
                        loaded: e.loaded,
                        total: e.total,
                        percent: progress + '%'
                    }
                    this.setState({
                        uploadVideos: this.state.uploadVideos
                    })
                }
            }, false)  // 第三个参数为useCapture?，是否使用事件捕获/冒泡
        
            xhr.addEventListener('load', (res) => {
                console.log(res)
            }, false)
            // xhr.addEventListener('error',uploadFail,false);
            // xhr.addEventListener('abort',uploadCancel,false)
        
            xhr.open('POST', url, true)  // 第三个参数为async?，异步/同步
            xhr.send(form)
            xhr.onload = () => {
                //如果请求成功
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    const res = JSON.parse(xhr.responseText)
                    if(res.success) {
                        this.state.uploadVideos[addIndex].videoId = res.result[1].id
                        this.state.uploadVideos[addIndex].videoName = res.result[1].name
                        this.state.uploadVideos[addIndex].videoUrl = res.result[1].url
                        this.setState({
                            uploadVideos: this.state.uploadVideos,
                            videoImgs: res.result[0]
                        })
                    }
                }
            }
        }
    }
    public openSignTab = function() {
        this.setState({openTab: true})
    }
    props
    public state = {
        input: {
            labelInput: '',
            titleInput: ''
        },
        openTab: false,
        uploadVideos: [{
            videoId: 0,
            videoName: '高兴的睡不着了',
            videoUrl: '',
            uploadState: {
              percent: '',
              total: 0,
              loaded: 0
            }
        },{
            videoId: 1,
            videoName: '你好啊',
            videoUrl: '',
            uploadState: {
              percent: '',
              total: 0,
              loaded: 0
            }
        }],
        labels: [
            '开心',
            '伤心'
        ],
        categorys: {
            '游戏': {    
                '单机游戏': '以单机或其联机模式为主要内容的相关视频',
                '网络游戏': '多人在线游戏为主要内容的相关视频',
                '音游': '通过配合音乐与节奏而进行的音乐类游戏',
                '电子竞技': '电子竞技游戏项目为主要内容的相关视频',
                '手机游戏': '手机及平板设备平台上的游戏相关视频',
                '桌游棋牌': '桌游、棋牌、卡牌对战等为主要内容的相关视频'
            },
            '生活': {
                '日常': '一般日常向的生活类视频',
                '动物圈': '可爱的、萌萌哒的宠物相关视频'
            },
            '娱乐': [

            ],
            '影视': [

            ],
            '音乐': [

            ],
            '科技': [

            ],
            '数码': [

            ],
            '动画': [

            ],
            '时尚': [

            ],
            '舞蹈': [

            ],
            '番剧': [

            ],
            '纪录片': [

            ],
            '鬼畜': [

            ],
            '广告': [

            ],
            '国创': [

            ],
            '电视剧': [

            ],
            '电影': [

            ]
        },
        myCategory: {
            one: '游戏',
            two: '单机游戏'
        },
        one: '游戏',
        two: '单机游戏',
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
    public uploadVideo() {
        document.getElementById('uploadVideo').click()
    }
    public uploadFile(e) {
        const url = 'upload/video'
        const form = new FormData()
        form.append('file', e.target.files[0])
        this.state.uploadVideos.push({
            videoId: 0,
            videoName: e.target.files[0].name.split('.')[0],
            videoUrl: '',
            uploadState: {
              percent: '',
              total: 0,
              loaded: 0
            }
        })
        const addIndex = this.state.uploadVideos.length - 1
        const xhr = new XMLHttpRequest()
        this.xhr = xhr
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const progress = Math.round((e.loaded / e.total) * 100)
                this.state.uploadVideos[addIndex].uploadState = {
                    loaded: e.loaded,
                    total: e.total,
                    percent: progress + '%'
                }
                this.setState({
                    uploadVideos: this.state.uploadVideos
                })
            }
        }, false)  // 第三个参数为useCapture?，是否使用事件捕获/冒泡
    
        // xhr.addEventListener('error',uploadFail,false);
        // xhr.addEventListener('abort',uploadCancel,false)
    
        xhr.open('POST', url, true)  // 第三个参数为async?，异步/同步
        xhr.send(form)
        xhr.onload = () => {
            //如果请求成功
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                const res = JSON.parse(xhr.responseText)
                if(res.success) {
                    this.state.uploadVideos[addIndex].videoId = res.result.id
                    this.state.uploadVideos[addIndex].videoName = res.result.name
                    this.state.uploadVideos[addIndex].videoUrl = res.result.url
                    this.setState({
                        uploadVideos: this.state.uploadVideos
                    })
                }
            }
        }
    }
    public deleteVideo(videoId) {
        console.log(videoId)
    }
    public selectCategory(one, two) {
        this.setState({myCategory:{one:one, two: two}}, () => {
            this.closeOpenTab()
        })
        
    }
    public selectOne(one) {
        this.setState({one: one})
    }
    public closeOpenTab() {
        this.setState({
            one: this.state.myCategory.one,
            two: this.state.myCategory.two
        })
        this.setState({openTab: false})
    }

    public deleteLabel(key) {
        this.state.labels.splice(key, 1)
        this.setState({labels: this.state.labels})
    }

    public handleChangeLabel(event) {
        this.setState({input: { ...this.state.input, labelInput: event.target.value }})    
    }
    public _handleChangeTitle(event) {
        this.setState({input: { ...this.state.input, titleInput: event.target.value }})
    }
    public _handleLabelPress(event) {
        if(event.key == 'Enter' && this.state.input.labelInput != '') {
            this.state.labels.push(this.state.input.labelInput)
            this.setState({
                labels: this.state.labels,
                input: {
                    ...this.state.input,
                    labelInput: ''
                }
            })
        }
    }
    public render () {
        return (
            <div className="drafts-component">
                <div className="drafts-content">
                    {
                        this.state.openTab ? (<div onClick={() => this.closeOpenTab()} className="fixed-mask"> </div>) : ''
                    }
                    <div className="fix-openTab"> </div>
                    <div>
                        <span className="file-title">文件上传 </span> （视频上传必须是mp4, avi, flv 格式）
                    </div>
                    <div className="file-description">
                        {
                            this.state.uploadVideos.map((value, key) => {
                                return (<div className="file-detail" key={key}>
                                            <img src={videoImg} /> 
                                            <div className="file-upload"> 
                                                <div className="file-video-name">
                                                    <span> {value.videoName} </span> 
                                                    <span className="upload-right"> 
                                                        <span className="file-delete" onClick={() => this.deleteVideo(key)}> 删除 </span> 
                                                        {value.uploadState.loaded == value.uploadState.total && value.uploadState.total != 0 ? '' : value.uploadState.percent}
                                                        <img className="file-finish-img" style={{ display: value.uploadState.loaded == value.uploadState.total && value.uploadState.total != 0 ? 'inline' : 'none' }} src={downloadSuccess} /> 
                                                    </span> 
                                                </div>
                                                <div className="upload-percent"> { value.uploadState.loaded == value.uploadState.total && value.uploadState.total != 0 ? '上传成功' : `${value.uploadState.loaded} / ${value.uploadState.total}`} </div> 
                                                <div style={ processStyle }></div> 
                                            </div> 
                                        </div>)
                            })
                        }
                    </div>
                    <div className="add-upload-video" onClick={() => this.uploadVideo()}>
                       + 添加视频
                    </div>
                    <input id="uploadVideo" type="file" className="upload-input" onChange={(e) => this.uploadFile(e)}/>
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
                                    this.state.videoImgs.map(function(value, key) {
                                        return (<div key={key} className="cover-img-right-imgs-value"><img src={value} /> <div className="select-img"> <img src={selectImg} /> </div> </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="video-title-info">
                        <span className="video-start">*</span> 标题 
                    </div>
                    <input type="text" value={this.state.input.titleInput} onChange={(e) => this._handleChangeTitle(e)}/>
                    <div className="video-title-info">
                        <span className="video-start">*</span> 类型
                    </div>
                    <input type="radio" /> 原创 <input type="radio" /> 转载
                    <div className="video-title-info">
                        <span className="video-start">*</span> 分区
                    </div>
                    <div className="drop-item" onClick={() => this.openSignTab()}>
                        {this.state.myCategory.one} → {this.state.myCategory.two}
                        <div className={this.state.openTab ? 'drop-item-down' : 'drop-item-up'}> </div>
                        <div className={this.state.openTab ? 'drop-item-content' : 'drop-item-none'}> 
                            <div className="drop-item-content-left">
                                {
                                    Object.keys(this.state.categorys).map((value, key) => {
                                        return (<div className={
                                            this.state.myCategory.one == value ? 'item-select-0' : (this.state.one == value ? 'item-select-1' : 'item')
                                        } onClick={() => this.selectOne(value)} key={key}>{value}</div>)
                                    })
                                }
                            </div>
                            <div className="drop-item-content-right">
                                {
                                    Object.keys(this.state.categorys[this.state.one]).map((value, key) => {
                                        return (<div className={this.state.one == this.state.myCategory.one && this.state.myCategory.two == value ? 'item-select' :'item'} key={key} onClick={()=> this.selectCategory(this.state.one, value)}><span className="title"> { value } </span> <span className="description"> {this.state.categorys[this.state.one][value]} </span> </div>)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/**
                        <select size={2} multiple></select>
                    */}
                    <div className="video-title-info">
                        <span className="video-start">*</span> 标签
                    </div>
                    <div className="label">
                        { 
                            this.state.labels.map((value, key) => {
                                return (<div className="label-div" key={key}> {value} <span className="close" onClick={()=>this.deleteLabel(key)}> × </span> </div>)
                            })
                        }
                        <input value={this.state.input.labelInput} onChange={(e)=>this.handleChangeLabel(e)} onKeyPress={(event)=> this._handleLabelPress(event) }/>
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

const mapStateToProps = (state) => {
    const { firstFile } = state.upload
    return {
        firstFile: firstFile
    }
}

export default connect(mapStateToProps, null)(Drafts)