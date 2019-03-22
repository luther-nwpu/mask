import * as React from 'react'
import './UploadVideo.scss'
import { UploadState } from '@config'
import Drafts from '@components/Drafts/Drafts'
import UploadVideoComponent from '@components/UploadVideoComponent/UploadVideoComponent'

export class UploadVideo extends React.Component {
    constructor(props) {
        super(props)
    }
    public state = {
        currentTab: UploadState.UPLOADING
    }
    public render() {
        return (
            <div className="upload-video-page">
                {
                    (() => {       
                        if(UploadState.NOUPLOAD === this.state.currentTab) {
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