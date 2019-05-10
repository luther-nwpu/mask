import { combineReducers } from 'redux'
import { auth } from './auth'
import { todoApp } from './todoApp'
import { upload } from './upload'
import { barrage } from './barrage'

const reducer = combineReducers({
    auth,
    todoApp,
    upload,
    barrage
})
export default reducer
