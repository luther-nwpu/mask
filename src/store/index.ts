import { createStore, applyMiddleware } from 'redux'
import reducer from '@store/reducer'
import ReduxThunk from 'redux-thunk'
import Logger from 'redux-logger'

const store = createStore(
    reducer,
    applyMiddleware(ReduxThunk, Logger),
)

export default store
