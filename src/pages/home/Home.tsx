import './Home.scss'
import React from 'react'
import { ArticleList } from '@components'

export class Home extends React.Component {


  render () {
    return (
      <div className="blog-app">
        <ArticleList></ArticleList>
      </div>
    )
  }
}