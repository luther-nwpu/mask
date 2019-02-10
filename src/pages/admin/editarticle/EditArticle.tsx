import * as React from 'react'
import { GET,  Post } from '@lib/helper'
import './EditArticle.scss'
import {Editor} from '@components'
import { UploadFile } from '../../../components/UploadFile/UploadFile'
import { IResponse } from '@lib/helper'
import BraftEditor, {EditorState} from 'braft-editor'
interface IState {
  id: number,
  title: string,
  description: string,
  img: string,
  content: string,
  update_at: string,
  picture: string
}
export class EditArticle extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props)
    this.state = {
      id: props.match.params.id,
      title: '',
      description: '',
      img: '',
      content: '',
      update_at: '',
      picture: ''
    }
    this.getArticleById()
  }
  public state:IState
  child:any
  editorChild: any
  public async save() {
    console.log(this.child.startUpload())
  }
  public async getArticleById() {
    const res = await Post('/api/common/getArticleById', {
        article_id: this.state.id
    })
    const result = res.result
    this.setState({
        title: result.title,
        description: result.description,
        update_at: result.update_at,
        content: result.content,
        picture: result.pictire_url
    })
}
  public changeTitle(event: any) {
    this.setState({title: event.target.value})
  }
  onRef = (ref) => {
    this.child = ref
  }
  onEditorRef = (ref) => {
    this.editorChild = ref
  }
  public changeDescription(event: any) {
    this.setState({description: event.target.value})
  }
  public handleEditorChange(value: any) {
    this.setState({content: value})
  }
  public handleUploadChange(res: IResponse) {
    const content = this.editorChild.getEditorContent()
    this.setState({img: res.result.id}) // 获取img的id
    Post('/api/admin/editArticle', {
      article_id: this.state.id,
      title: this.state.title,
      img: this.state.img,
      content: content,
      description: this.state.description
    })
  }
  public render() {
    return (
      <div className="App">
        <div>文章标题</div><input value={this.state.title} onChange={() => this.changeTitle(event)}></input>
        <div>文章图片</div><UploadFile onRef={this.onRef} afterUpload={(val:IResponse) => this.handleUploadChange(val)}></UploadFile>
        <div>文章描述</div><textarea value={this.state.description} onChange={() => this.changeDescription(event)}></textarea>
        <button onClick={() => this.save()}>保存</button>
        <Editor onEditorRef={this.onEditorRef} content = {this.state.content}></Editor>
      </div>
    )
  }
}
