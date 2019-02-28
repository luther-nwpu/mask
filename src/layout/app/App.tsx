import * as React from 'react'
import { instanceOf } from 'prop-types'
import { Frame } from '../Frame'
import { connect } from 'react-redux'
import { withCookies, Cookies } from 'react-cookie'
import { Route, Switch } from 'react-router-dom'
import './App.scss'
import { MaskApp, AdminApp } from '@layout'
import { Footer } from '@components'
class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  public state = {
  }
  constructor(props: any) {
    super(props)
    const { cookies } = props
    console.log('cookies', cookies)
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
const mapStateToProps = (state, ownProps) => {
  return ({
    state: state,
    cookies: ownProps.cookies
  })
}

export default withCookies(connect(mapStateToProps, null)(App))