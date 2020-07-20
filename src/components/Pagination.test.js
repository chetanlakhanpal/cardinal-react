import React from 'react';
import Pagination from './Pagination'
import { shallow } from 'enzyme'

describe('Pagination', () => {
  const paginationControl = {
    offset: 0,
    limit: 10,
    currentPage: 1
  }

  const paginationComponent = shallow(
  <Pagination totalItems={100} updatePaginationData={() => {}} paginationControl={paginationControl}/>)
  
  it('renders properly', () => {
    expect(paginationComponent).toMatchSnapshot()
  })
})