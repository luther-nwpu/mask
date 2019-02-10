import * as React from 'react'
import { Post } from '@lib/helper'
import './Article.scss'
import history from '@router'
import BraftEditor, {EditorState} from 'braft-editor'
interface IProps {
    id: number
}
interface ArticleDetail {
    title: string,
    description: string,
    content: EditorState,
    update_at: string,
    picture: string
}
interface IState {
    articleDetail: ArticleDetail
}
export class Article extends React.Component<IProps, IState> {
    articleDetail: ArticleDetail = {
        title: '',
        description: '',
        content: BraftEditor.createEditorState(null),
        update_at: '',
        picture: ''
    }
    state: IState = {
        articleDetail: this.articleDetail
    }
    constructor(props: any) {
        super(props)
        this.getArticleById()
    }
    public async getArticleById() {
        const res = await Post('/api/common/getArticleById', {
            article_id: this.props.id
        })
        const result = res.result
        this.setState({
            articleDetail: {
                title: result.title,
                description: result.description,
                update_at: result.update_at,
                content: BraftEditor.createEditorState(JSON.parse(result.content)),
                picture: result.pictire_url
            } 
        })
    }
    public linkToEditArticle(articleId) {
        history.push(`/admin/editarticle/${articleId}`)
    }

    public render() {
        return (
            <div className="app">
                <button onClick={() => this.linkToEditArticle(this.props.id)}> 跳转到1编辑 </button>
                <div className="article-app"> 
                    <div className="article-app-title">
                        {this.state.articleDetail.title}
                    </div>
                    <div className="article-app-description">
                        {this.state.articleDetail.description}
                    </div>
                    <div>
                        {this.state.articleDetail.update_at}
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML = {{ __html:this.state.articleDetail.content.toHTML() }}></div>
                    </div>
                </div>
            </div>
        )
    }
}