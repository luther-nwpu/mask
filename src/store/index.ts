import { createStore, applyMiddleware } from 'redux'
import reducer from '@store/reducer'
import ReduxThunk from 'redux-thunk'
import Logger from 'redux-logger'

const configureStore = function(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(ReduxThunk, Logger),
    )
    
}
export default configureStore
