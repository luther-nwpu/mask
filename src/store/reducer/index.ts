import { combineReducers } from 'redux'
import { auth } from './auth'
import { todoApp } from './todoApp'
import { upload } from './upload'
import { barrage } from './barrage'
import { chat } from './chat'

const reducer = combineReducers({
    auth,
    todoApp,
    upload,
    barrage,
    chat
})
export default reducer
