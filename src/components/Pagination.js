import React from 'react'
import PropTypes from 'prop-types';

const Pagination = ({paginationControl, totalItems, updatePaginationData}) =>
{
    const { limit, currentPage } = paginationControl
    const paginationLimit = 10
    const totalPages = Math.ceil(totalItems/paginationLimit);
    let start = 0
    let end = paginationLimit
    const pageEndDiff = totalPages - paginationLimit
    if (currentPage >= paginationLimit && pageEndDiff > 0) {
        if (pageEndDiff < 5) {
            end = paginationLimit + pageEndDiff
        } else {
            end = paginationLimit + 5
        }
        start = currentPage - 1
    }
    const steps = Array.from(Array(totalPages).keys(), n => n + 1).slice(start, end)
    const prevDisabled = totalItems < limit || currentPage === 1
    const nextDisabled = totalItems < limit || currentPage >= totalPages

    const setCurrentPage = (value) => {
        if (value === currentPage) {
            return 
        }
        updatePaginationData( {
            offset: (value - 1) * paginationLimit,
            limit: value * paginationLimit,
            currentPage: value
        } )
    }

    const increasePage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage+1)
        }
    }

    const decreasePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage-1)
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${prevDisabled ? 'disabled' : ''}`}>
                    <a className="page-link" href="#"
                    title={!prevDisabled? currentPage-1 : currentPage }
                    aria-disabled={prevDisabled}
                    disabled={prevDisabled}
                    onClick={decreasePage}
                    >Previous</a>
                </li>
                {steps.map((value) => (
                    <li className={`page-item ${value === currentPage ? 'active' : ''}`}
                        key={value}>
                        <a className="page-link" href="#"
                        onClick={(event) => {event.preventDefault(); setCurrentPage(value)}}>{value}</a>
                    </li>
                ))}
                <li className={`page-item ${nextDisabled ? 'disabled' : ''}`}>
                    <a className="page-link" href="#"
                    title={!nextDisabled? currentPage+1 : currentPage }
                    aria-disabled={nextDisabled}
                    onClick={increasePage}
                    disabled={nextDisabled}>Next</a>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propType = {
    totalItems: PropTypes.number.isRequired
}

export default Pagination