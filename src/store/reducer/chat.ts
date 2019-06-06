import { CLEARFIRSTUSER, CHATFIRSTUSER } from '../actions/chat'

export const chat = (state = {
  user: null
}, action) => {
  switch (action.type) {
      case CLEARFIRSTUSER:
          return Object.assign({}, state, {
              user: null
          })
      case CHATFIRSTUSER:
          return Object.assign({}, state, {
            barrages: action.user
        })
      default:
          return state
  }
}