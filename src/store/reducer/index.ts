import { combineReducers } from 'redux'
import { auth } from './auth'
import { todoApp } from './todoApp'

const reducer = combineReducers({
    auth,
    todoApp
})
export default reducer
