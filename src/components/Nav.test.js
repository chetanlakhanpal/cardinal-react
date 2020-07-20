import React from 'react'
import { shallow } from 'enzyme'
import Nav from './Nav'

describe('Nav Component', () => {
  const navComponent = shallow(<Nav/>)

  it('renders component', () => {
    expect(navComponent).toMatchSnapshot()
  })
})



