import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from '@config/registerServiceWorker'
import RouterConfig from 'router'

ReactDOM.render(<RouterConfig  />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
