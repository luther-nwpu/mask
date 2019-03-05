import { STOREUSERINFO } from '../actions'
import { combineReducers } from 'redux'
function todoApp(state = {}, action) {
    switch (action.type) {
        case STOREUSERINFO: 
            return Object.assign({}, state, {
                userinfo: action.text
            })
        default:
            return state
    }
}
const reducer = combineReducers({
    todoApp
})
export default reducer
