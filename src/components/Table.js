import React from 'react'
import Pagination from './Pagination'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { fetchFeedsData, updateFeed, setFeedPagination } from '../redux/actions/feed.action'
import { connect } from 'react-redux'
import { MARK_DELETE, MARK_READ } from '../redux/constants/feed.constant';

const StyledTableInput = styled.input`
width: 200px;
display: inline-block;
margin-left: 5px;
`

const StyledTableRow = styled.tr`
background-color: ${props => !props.read ? '#ffffd7': '#fff'}
`

class Table extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    componentDidUpdate (prevProps, prevState) {
      if ((prevProps.topFeeds.length !== this.props.topFeeds.length) || (
        prevProps.pagination.currentPage !== this.props.pagination.currentPage))  {
        const { offset, limit } = this.props.pagination
        this.props.fetchFeedsData(offset, limit)
      }
    }

    handleSearch = (value) => {
        this.setState((state) => ({...state, search: value}))
    }
    
    markAsRead = (feed) => {
        this.props.updateFeed(feed, MARK_READ)
    }

    markAsDelete = (feed) => {
        this.props.updateFeed(feed, MARK_DELETE)
    }

    updatePaginationData = (data) => {
        this.props.setFeedPagination(data)
    }

    render () {
        const { cols, feedsData } = this.props
        const { search } = this.state
        if (feedsData.length === 0) {
            return (<div className="alert alert-warning" role="alert">
           No data
        </div>)
        }

        const rows = feedsData
        .filter((value) => {
            return (!value.deleted 
            && (value.by.indexOf(search) > -1
            || value.text.indexOf(search) > -1
            || value.title.indexOf(search) > -1))
        })
        return (
            <>
                <div className="row mb-2">
                    <div className="col-12">
                        <label htmlFor="search_input">
                            Search:
                        </label>
                        <StyledTableInput type="text"
                            placeholder="Type here...." 
                            className="form-control" id="searh_input" value={this.state.search} 
                            onChange={(event) => this.handleSearch(event.target.value)} />
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            {cols.map((value, index) => (
                                <th key={index} scope="col">{value}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows && rows.length > 0 && (
                            rows.map((value) => (
                                <StyledTableRow key={value.id} read={value.read}>
                                    <td>{value.id}</td>
                                    <td>{value.by}</td>
                                    <td>{value.score}</td>
                                    <td>{value.text.length > 100 ? `${value.text.slice(0, 100)}...` : value.text}</td>
                                    <td>{value.time   }</td>
                                    <td>{value.title}</td>
                                    <td>{value.type}</td>
                                    <td>
                                        {value.url && value.url.length > 0 && (
                                            <a href={value.url} title={value.url}>...</a>
                                        )}
                                        {value.url && value.url.length === 0 && (
                                            <span>N/A</span>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => this.markAsDelete(value)} type="button" className="btn btn-danger">
                                            Delete
                                        </button>
                                        <button onClick={() => this.markAsRead(value)} type="button" className="btn btn-warning">
                                            Mark as Read
                                        </button>
                                    </td>
                                </StyledTableRow>
                            ))
                        )}
                    </tbody>
                </table>
                <Pagination totalItems={this.props.topFeeds.length} paginationControl={this.props.pagination} updatePaginationData={this.updatePaginationData}/>
            </>
        )
    }
}

Table.propTypes = {
    cols: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    pagination: state.feeds.pagination
})

const mapDispatchToProps = {
    fetchFeedsData,
    updateFeed,
    setFeedPagination
}


export default connect(mapStateToProps, mapDispatchToProps)(Table)