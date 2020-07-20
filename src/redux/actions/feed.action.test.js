import * as constants from '../constants/feed.constant'
import * as actions from './feed.action'

it('sets topFeeds data', () => {
  const topFeeds = [100022, 100023]
  const expectedAction = {
    type: constants.SET_TOP_FEEDS,
    payload: topFeeds
  }
  expect(actions.setTopFeeds(topFeeds)).toEqual(expectedAction)
})