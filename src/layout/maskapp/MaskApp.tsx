import * as React from 'react'
import {Home} from '@pages'
import { Route, Switch } from 'react-router-dom'
import './MaskApp.scss'
import { Person, VideoPage } from '@pages'
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
          <Route exact={true} path={`${this.state.match}`} component={ Home } />
          <Route path={`${this.state.match}personinfo`} component={ Person } />
          <Route path={`${this.state.match}video/:id`} component = { VideoPage }/>
          <Route path={`${this.state.match}uploadfile`} component={ UploadVideo } />
        </div>
      </div>
    )
  }
}
