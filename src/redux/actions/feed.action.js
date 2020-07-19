import { 
  SET_FEEDS_DATA,
  SET_TOP_FEEDS,
  FEEDS_DATA_INIT,
  FEEDS_DATA_ERROR,
  MARK_READ,
  MARK_DELETE,
  SET_FEED_PAGINATION } from '../constants/feed.constant'

import { getFeeds } from '../../services/feeds.service'

export const setFeedsData = feed => ({
  type: SET_FEEDS_DATA,
  payload: feed
})

export const setTopFeeds = feed => ({
  type: SET_TOP_FEEDS,
  payload: feed
})

const fetchFeedsError = (feedError) => ({
  type: FEEDS_DATA_ERROR,
  payload: feedError
})

const fetchFeedsInit = () => ({
  type: FEEDS_DATA_INIT
})

export const setFeedPagination = (currentPage) => ({
  type: SET_FEED_PAGINATION,
  payload: currentPage
})

export const fetchFeedsData = (offset, limit) => (dispatch, getState) => {
  dispatch(fetchFeedsInit())

  const feeds = getState().feeds.topFeeds.slice(offset, limit)
  const promises = feeds.map(id => {
    return getFeeds(id)
  })
  Promise.all(promises)
  .then(values => {
   const feedsData = values.map(value => {
     const {data} = value
     data.read = false
     data.deleted = false
     data.by = data.by || ''
     data.text = data.text || ''
     data.title = data.title || ''
     data.type = data.type || ''
     return data
   })
    dispatch(setFeedsData(feedsData))
  })
  .catch(error => {
    dispatch(fetchFeedsError(error))
  })
}

export const updateFeed = (feed, type) =>(dispatch, getState) => {
  const feeds = getState().feeds.feedsData.map((value) => {
    if (value.id  === feed.id) {
      if (type === MARK_READ) {
        value.read = true
      } else if (type === MARK_DELETE) {
        value.deleted = true
      }
    }
    return value
  })
  dispatch(setFeedsData(feeds))
}
