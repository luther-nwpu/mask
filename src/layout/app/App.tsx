import * as React from 'react'
import {Home} from '@pages'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
import { ArticleDetail } from '@pages'
import { BlogApp, AdminApp } from '@layout'
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
      <div className="page">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
        <Route path={`${this.state.match}`} component={BlogApp}/>
        <Route path={`${this.state.match}admin`} component={AdminApp} />
      </div>
    )
  }
}
