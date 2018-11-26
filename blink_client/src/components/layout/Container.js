import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

// Components
import Header from '../common/Header';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import SearchResult from './SearchResult';
import Spinner from '../common/Spinner';
import ErrorAlert from '../common/ErrorAlert';

// Redux imports
import { connect } from 'react-redux';
import { searchArtist } from '../../redux/actions/spotifyActions';
import { clearSearchResults } from '../../redux/actions/spotifyActions';
import { setSpotifySearchLoading } from '../../redux/actions/spotifyActions';

class Container extends Component {
  componentDidMount() {
    let params = queryString.parse(this.props.history.location.search);

    if (Object.keys(params).length !== 0) {
      this.handleSubmit(
        params.search,
        parseInt(params.offset),
        parseInt(params.page)
      );
    } else {
      if (Object.keys(this.props.searchResults).length !== 0) {
        this.props.clearSearchResults();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentPage !== this.props.currentPage &&
      this.props.searchResults !== nextProps.searchResults
    ) {
      if (Object.keys(nextProps.searchResults).length !== 0) {
        this.handlePageUpdate(nextProps);
      }
    }
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      let params = queryString.parse(this.props.history.location.search);

      if (Object.keys(params).length !== 0) {
        this.handleSubmit(
          params.search,
          parseInt(params.offset),
          parseInt(params.page)
        );
      } else {
        this.props.clearSearchResults();
      }
    };
  }

  handlePageUpdate = nextProps => {
    let params = queryString.parse(nextProps.searchResults.artists.href);

    let pathName = this.props.location.pathname;
    this.props.history.push(
      `${pathName}?search=${nextProps.search}&page=${
        nextProps.currentPage
      }&offset=${params.offset}`
    );
  };

  nextPageChange = () => {
    if (this.props.searchResults.artists.next) {
      let params = queryString.parse(this.props.searchResults.artists.next);
      this.props.searchArtist(
        this.props.search,
        params.offset,
        this.props.currentPage + 1
      );
    }
  };

  prevPageChange = e => {
    if (this.props.currentPage > 1) {
      let params = queryString.parse(this.props.searchResults.artists.previous);
      this.props.searchArtist(
        this.props.search,
        params.offset,
        this.props.currentPage - 1
      );
    }
  };

  handleSubmit = (search, offset = 0, currentPage = 1) => {
    if (search.trim() !== '') {
      this.props.setSpotifySearchLoading();
      this.props.searchArtist(search, offset, currentPage);
    }
  };

  render() {
    const { error } = this.props;

    if (this.props.loading) {
      return (
        <div>
          <Header auth={this.props.auth} handleSubmit={this.handleSubmit} />
          <div style={{ textAlign: 'center' }}>
            <Spinner />
          </div>
        </div>
      );
    }

    let loginRegister =
      Object.keys(this.props.searchResults).length !== 0 ? (
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          Want to save all your favorite artists?
          <br /> <Link to={'/login'}>Login </Link>
          or {''}
          <Link to={'/register'}>Register</Link>
        </div>
      ) : null;

    let errorAlert =
      Object.keys(error).length > 0 ? (
        <ErrorAlert error={this.props.error} />
      ) : null;

    return (
      <div>
        <Header auth={this.props.auth} handleSubmit={this.handleSubmit} />
        <div className="container">
          {loginRegister}
          {errorAlert}

          <SearchResult
            searchResults={this.props.searchResults}
            showModal={this.showModal}
            auth={this.props.auth}
          />

          <Pagination
            currentPage={this.props.currentPage}
            nextPageChange={this.nextPageChange}
            prevPageChange={this.prevPageChange}
            searchResults={this.props.searchResults}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchArtist: PropTypes.func,
  clearFavorites: PropTypes.func,
  searchResults: PropTypes.object,
  error: PropTypes.object,
  setSpotifySearchLoading: PropTypes.func
};

const mapStateToProps = state => {
  return {
    searchResults: state.spotify.searchResults,
    currentPage: state.spotify.currentPage,
    auth: state.auth,
    search: state.spotify.search,
    loading: state.spotify.loading,
    error: state.spotify.error
  };
};

export default connect(
  mapStateToProps,
  { searchArtist, clearSearchResults, setSpotifySearchLoading }
)(withRouter(Container));
