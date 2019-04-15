import './Home.scss'
import React from 'react'
import Video from '@components/Video/Video'
export class Home extends React.Component {
  render () {
    return (
      <div className="mask-app">
        <Video src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/1500_a5a9fa0998476beed1d02aed4f5a79dc.mp4"></Video>
      </div>
    )
  }
}