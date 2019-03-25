import './Home.scss'
import React from 'react'
import { Swiper } from '@components'
export class Home extends React.Component {
  render () {
    return (
      <div className="mask-app">
        <Swiper></Swiper>
      </div>
    )
  }
}