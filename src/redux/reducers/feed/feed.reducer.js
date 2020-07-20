import { SET_FEEDS_DATA, FEEDS_DATA_ERROR, SET_TOP_FEEDS, FEEDS_DATA_INIT, SET_FEED_PAGINATION } from '../../constants/feed.constant'

export const INITIAL_STATE = {
  fetchInit: false,
  fetchError: '',
  feedsData: [],
  topFeeds: [],
  newDataReceived: false,
  pagination: {
    offset: 0,
    limit: 10,
    currentPage: 1
  }
}

//Adding current Page here, as Firebase emits an event for 500 ids
// We're implementing server side pagination, as soon as new
// data arrives components loses it's internal state
// We could mantain state in the Table component if all the data is 
// available to us before hand, or we store internal staet in Dashboard component
// better to store in store to avoid losing last visited page

const feedReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_FEED_PAGINATION:
      return {...state, pagination: action.payload}
    case FEEDS_DATA_INIT:
      return {...state, fetchInit: true, fetchError: ''}
    case SET_TOP_FEEDS:
      return {...state, fetchInit: false, fetchError: '', topFeeds: action.payload}
    case SET_FEEDS_DATA:
      return {...state, fetchInit: false, feedsData: action.payload}
    case FEEDS_DATA_ERROR:
      return {...state, fetchInit: false, fetchError: action.payload}
    default:
      return state
  }
} 

export default feedReducer