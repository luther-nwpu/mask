import { combineReducers } from 'redux'
import { auth } from './auth'
import { todoApp } from './todoApp'
import { upload } from './upload'

const reducer = combineReducers({
    auth,
    todoApp,
    upload
})
export default reducer
