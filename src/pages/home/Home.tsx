import './Home.scss'
import React from 'react'
import { TopBar, Auth } from '@components'

export class Home extends React.Component {
  render () {
    return (
      <div className="mask-app">
          <TopBar></TopBar>
          <Auth></Auth>
      </div>
    )
  }
}