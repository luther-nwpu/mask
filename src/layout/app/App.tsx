import * as React from 'react'
import { Frame } from '../Frame'
import { Route, Switch } from 'react-router-dom'
import './App.scss'

import { MaskApp, AdminApp } from '@layout'
import { Footer } from '@components'
export class App extends React.Component {
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
      <div className="app-page">
        <Frame></Frame>
        <Route path={`${this.state.match}`} component={MaskApp}/>
        <Route path={`${this.state.match}admin`} component={AdminApp} />
        <Footer> </Footer>
      </div>
    )
  }
}

