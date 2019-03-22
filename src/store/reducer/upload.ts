import { UPLOADFIRSTFILE } from '../actions/upload'
import { UploadState } from '@config'

export const upload = (state = {
  uploadType: UploadState.NOUPLOAD
}, action) => {
  switch (action.type) {
      case UPLOADFIRSTFILE:
          return Object.assign({}, state, {
              uploadType: action.uploadType,
              firstFile: action.firstFile
          })
      default:
          return state
  }
}