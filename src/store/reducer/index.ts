import { STOREUSERINFO, DISPLAYAUTH } from '../actions'
import { combineReducers } from 'redux'
function todoApp(state = {}, action) {
    switch (action.type) {
        case STOREUSERINFO: 
            return Object.assign({}, state, {
                userinfo: action.userinfo
            })
        default:
            return state
    }
}
const auth = (state = {
    isDisplay: false
}, action) => {
    switch (action.type) {
        case DISPLAYAUTH:
            return Object.assign({}, state, {
                isDisplay: action.isDisplay,
                authTab: action.authTab
            })
        default:
            return state
    }
}
const reducer = combineReducers({
    auth,
    todoApp
})
export default reducer
