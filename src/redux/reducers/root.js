import { combineReducers } from 'redux'
import feedReducer from './feed/feed.reducer'

const rootReducer = combineReducers({
  feeds: feedReducer
})

export default rootReducer