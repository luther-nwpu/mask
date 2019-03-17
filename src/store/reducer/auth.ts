import { DISPLAYAUTH } from '../actions/auth'

export const auth = (state = {
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