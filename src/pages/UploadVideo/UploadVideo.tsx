import * as React from 'react'
import './UploadVideo.scss'
import { UploadState } from '@config'
import Drafts from '@components/Drafts/Drafts'
import UploadVideoComponent from '@components/UploadVideoComponent/UploadVideoComponent'
import { connect } from 'react-redux'
import { uploadFirstFile } from '@store/actions/upload'

class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
        props.uploadFile(UploadState.UPLOADING, null)
    }
    props
    public state = {
        currentTab: UploadState.NOUPLOAD
    }
    public render() {
        return (
            <div className="upload-video-page">
                {
                    (() => {       
                        if(UploadState.NOUPLOAD ===  this.props.uploadType  || this.state.currentTab) {
                            return <UploadVideoComponent />
                        } else {
                            return <Drafts />
                        }
                    })()
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { uploadType } = state.upload
    return {
        uploadType: uploadType
    }
}

const mapDispatchToProps = dispatch => ({
    uploadFile: (uploadType, firstFile) => dispatch(uploadFirstFile(uploadType, firstFile))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo)