import { DISPATCHSENDBARRAGE, STOREBARRAGES, PUSHBARRAGE } from '../actions/barrage'

export const barrage = (state = {
  barrages: [],
  barrageContent: ''
}, action) => {
  switch (action.type) {
      case STOREBARRAGES:
          return Object.assign({}, state, {
              barrages: action.barrages.sort((a, b) => {
                 return a.video_time - b.video_time
              })
          })
      case DISPATCHSENDBARRAGE:
          return Object.assign({}, state, {
              barrageContent: action.content
          })
      case PUSHBARRAGE:
          state.barrages.push(action.barrage)
          return Object.assign({}, state, {
            barrages: state.barrages.sort((a, b) => {
               return a.video_time - b.video_time
            })
        })
      default:
          return state
  }
}