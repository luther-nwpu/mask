import { DISPATCHSENDBARRAGE, STOREBARRAGES } from '../actions/barrage'

export const barrage = (state = {
  barrages: [],
  barrageContent: ''
}, action) => {
  switch (action.type) {
      case STOREBARRAGES:
          return Object.assign({}, state, {
              barrages: action.barrages
          })
      case DISPATCHSENDBARRAGE:
          return Object.assign({}, state, {
              barrageContent: action.content
          })
      default:
          return state
  }
}