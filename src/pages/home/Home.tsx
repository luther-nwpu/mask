import './Home.scss'
import React from 'react'
import { TopBar } from '@components'

export class Home extends React.Component {
  render () {
    return (
      <div className="mask-app">
          <TopBar></TopBar>
      </div>
    )
  }
}