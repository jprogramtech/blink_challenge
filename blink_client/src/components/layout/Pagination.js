import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const { currentPage } = this.props;
    const { searchResults } = this.props;

    if (searchResults === null || Object.keys(searchResults).length === 0) {
      return null;
    }

    let per_page = 8;
    let total = searchResults.artists.total;

    const lastPage = Math.ceil(total / per_page);

    const firstItemNumber = (currentPage - 1) * per_page + 1;
    const lastItemNumber = Math.min(currentPage * per_page, total);

    const itemCount = lastItemNumber + 1 - firstItemNumber;

    const itemPlurality = itemCount === 1 ? '' : 's';

    const previousPageItemClass =
      currentPage > 1 ? 'page-item' : 'page-item disabled';
    const nextPageItemClass =
      currentPage * per_page < total ? 'page-item' : 'page-item disabled';

    return (
      <nav aria-label="Page Navigation">
        <ul className="pagination">
          <li className={previousPageItemClass}>
            <button onClick={this.props.prevPageChange} className="btn">
              <i title="Prevous Page" className="fas fa-step-backward" />
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} of {lastPage.toLocaleString()}
            </span>
          </li>
          <li className={nextPageItemClass}>
            <button onClick={this.props.nextPageChange} className="btn">
              <i title="Last Page" className="fas fa-step-forward" />
            </button>
          </li>
        </ul>
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">
              Showing {itemCount} item{itemPlurality} (
              {firstItemNumber.toLocaleString()} -{' '}
              {lastItemNumber.toLocaleString()} of {total.toLocaleString()}{' '}
              total)
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
