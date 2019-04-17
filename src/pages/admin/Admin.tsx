import * as React from 'react'
import { Get } from '@lib/helper'
import './Admin.scss'
import {ArticleList} from '@components'
import history from '@router'
export class Admin extends React.Component {
  public constructor(props: any) {
    super(props)
  }
  public async getAllArticles() {
    const res = await Get('/blog/getAllArticles', {})
    console.log(res)
  }
  public switchToAddArticle() {
    history.push('/admin/addarticle')
  }
  public render() {
    return (
      <div className="admin-app">
        <button onClick={this.switchToAddArticle}> 写文章 </button>
        <ArticleList></ArticleList>
      </div>
    )
  }
}