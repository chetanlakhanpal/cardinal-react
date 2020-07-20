import React from 'react'
import { shallow } from 'enzyme'
import Table from './Table'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { INITIAL_STATE } from '../redux/reducers/feed/feed.reducer';
const store = configureMockStore()({
  feeds: INITIAL_STATE
})

describe ('Table component', () => {
  const tableComponent = shallow(
    <Provider store={store}>
      <Table />
    </Provider>
    )

  it('renders properly', () => {
    expect(tableComponent).toMatchSnapshot()
  })

  xit('itializes state with empty search field', () => {
    expect(tableComponent.state()).toEqual({search: ''})
  })
})