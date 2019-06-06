import { STOREUSERINFO } from '../actions/todoApp'

export const todoApp = (state = {
    userinfo: null
}, action) => {
  switch (action.type) {
      case STOREUSERINFO: 
          return Object.assign({}, state, {
              userinfo: action.userinfo
          })
      default:
          return state
  }
}
