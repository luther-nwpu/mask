import * as React from 'react'
import { Article } from '@components'
interface ISTATE {
    id: number
}
export class ArticleDetail extends React.Component<{}, ISTATE> {
    state = {
        id: 0
    }
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id
        }
    }
    public render() {
        return (
            <Article id={this.state.id}></Article>
        )
    }
}