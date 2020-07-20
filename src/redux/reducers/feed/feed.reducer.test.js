import feedReducer from './feed.reducer';
import * as actions from '../../actions/feed.action';

describe('feedReducer', () => {
  it('sets topFeeds', () => {
    const topFeeds = [10029, 10030]
    const prevState = {fetchInit: false, fetchError: '', topFeeds: []}
    const setTopFeeds = actions.setTopFeeds(topFeeds)
    const expectedState = {...prevState, topFeeds: topFeeds}

    expect(feedReducer(prevState, setTopFeeds))
    .toEqual(expectedState)
  })
})
