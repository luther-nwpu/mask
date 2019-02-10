import * as React from 'react'
import {Route, Switch} from 'react-router'
import { Admin, AddArticle, EditArticle } from '@pages'
import './AdminApp.scss'
export class AdminApp extends React.Component {
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
          <Switch>
            <Route exact={true} path={`${this.state.match}`} component={Admin} />
            <Route path={`${this.state.match}/addarticle`} component={AddArticle}/>
            <Route path={`${this.state.match}/editarticle/:id`} component= { EditArticle }/>
          </Switch>
      </div>
    )
  }
}
