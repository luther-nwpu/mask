import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
interface Props {
  content: string,
  onEditorRef: Function
}
export class Editor extends React.Component<Props, {}> {
  componentDidMount(){
    this.props.onEditorRef(this)
  }
  constructor(props) {
    super(props)
    this.state = { 
      content: props.content,
      editorState: BraftEditor.createEditorState(props.content) }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.content !== prevState.content) {
      return {
        content: nextProps.content,
        editorState: BraftEditor.createEditorState(nextProps.content),
      }
    }
    return null
  }
  public getEditorContent() {
    return this.state.editorState.toRAW()
  }
  public state = {
    content: '',
    editorState: BraftEditor.createEditorState(null)
  }

  render () {
    return (
      <BraftEditor value={this.state.editorState} onChange={this.handleChange}/>
    )
  }

  handleChange = (editorState) => {
    this.setState({ editorState })
    
  }
}