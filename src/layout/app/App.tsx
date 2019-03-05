import * as React from 'react'
import { instanceOf } from 'prop-types'
import { Frame } from '../Frame'
import { connect } from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
import { MaskApp, AdminApp } from '@layout'
import { Footer } from '@components'
import { storeUserInfo } from '@store/actions'
class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  public state = {
    cookies: ''
  }
  constructor(props: any) {
    super(props)
    const { cookies } = props
    this.state.cookies = cookies.cookies.user
    storeUserInfo(cookies)
  }

  public render() {
    return (
      <div className="app-page">
        <Frame></Frame>
        <Route path="/" component={MaskApp}/>
        <Route path="/admin" component={AdminApp} />
        <Footer> </Footer>
      </div>
    )
  }
}

export default withCookies(connect(null, null)(App))