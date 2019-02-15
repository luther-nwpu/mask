import * as React from 'react'
import {Home} from '@pages'
import { Route, Switch } from 'react-router-dom'
import './MaskApp.scss'
import { ArticleDetail } from '@pages'
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
      <div className="maskapp">
        <Switch>
          <Route exact={true} path={`${this.state.match}`} component={Home} />
          <Route path={`${this.state.match}article/:id`} component={ ArticleDetail } />`
        </Switch>
      </div>
    )
  }
}
