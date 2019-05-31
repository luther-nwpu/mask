import * as React from 'react'
import {Home} from '@pages'
import { Route } from 'react-router-dom'
import './MaskApp.scss'
import { Person, DraftPage, HaiyouPage, UserPage, FindPasswordPage, VideoSearch } from '@pages'
import VideoPage from '@pages/VideoPage/VideoPage'
import UploadVideo from '@pages/UploadVideo/UploadVideo'
import TopBar from '@components/TopBar/TopBar'
export class MaskApp extends React.Component {
  public state = {
    match: '',
  }
  constructor(props: any) {
    super(props)
    this.state = {
      match: props.match.path, 
    }
  }
  public render() {
    return (
      <div className="mask-app">
        <TopBar></TopBar>
        <div className="content">
          <Route exact={ true } path={ `${this.state.match}`} component={ Home } />
          <Route path={ `${this.state.match}personinfo`} component={ Person } />
          <Route path={ `${this.state.match}haiyou/:id`} component = { VideoPage }/>
          <Route path={ `${this.state.match}edithaiyou/:id`} component = { HaiyouPage } />
          <Route path={ `${this.state.match}editdraft/:id`} component = { DraftPage } />
          <Route path={ `${this.state.match}uploadfile`} component={ UploadVideo } />
          <Route path={ `${this.state.match}user/:id` } component = { UserPage } />
          <Route path={ `${this.state.match}findPassword` } component = { FindPasswordPage } />
          <Route path={`${this.state.match}search`}  component = { VideoSearch } />
        </div>
      </div>
    )
  }
}
