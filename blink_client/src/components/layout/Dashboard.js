import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';

// Components
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Pagination from './Pagination';
import Navbar from './Navbar';
import Fav from './Favs';
import Modal from '../common/Modal';
import Spinner from '../common/Spinner';

// Redux imports
import { connect } from 'react-redux';
import { searchArtist } from '../../redux/actions/spotifyActions';
import { clearSearchResults } from '../../redux/actions/spotifyActions';
import { addFavorite } from '../../redux/actions/favoriteActions';
import { getFavorites } from '../../redux/actions/favoriteActions';
import { logoutUser } from '../../redux/actions/authActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  // Start of react component lifecycle events

  componentDidMount() {
    let params = queryString.parse(this.props.history.location.search);

    if (Object.keys(params).length !== 0) {
      this.handleSubmit(
        params.search,
        parseInt(params.offset),
        parseInt(params.page)
      );
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

    if (this.state.showModal || this.state.showFavModal) {
      window.showModal('modal', () => {});
    }
  }

  // Start of Event handlers
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
    this.setModalFalse();
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
    this.setModalFalse();
    if (this.props.currentPage > 1) {
      let params = queryString.parse(this.props.searchResults.artists.previous);
      this.props.searchArtist(
        this.props.search,
        params.offset,
        this.props.currentPage - 1
      );
    }
  };

  handleSubmit = (search, offset = 0, pageOffset = 1) => {
    this.checkToken();
    this.setModalFalse();
    this.props.searchArtist(search, offset, pageOffset);
  };

  logout = () => {
    this.props.logoutUser();
  };

  addFavorite = item => {
    this.checkToken();
    let imageUrl = item.images[0] ? item.images[0]['url'] : null;

    let data = {
      name: item['name'],
      externalUrl: item['external_urls']['spotify'],
      imageUrl: imageUrl,
      followers: item['followers']['total']
    };

    this.setModalFalse();
    this.props.addFavorite(data);
  };

  getFavorites = () => {
    this.checkToken();
    this.showFavorites();
    this.props.getFavorites();
  };

  showModal = item => {
    this.setState({
      showModal: true,
      item: item
    });
  };

  showFavorites = () => {
    this.setState({
      showFavModal: true,
      showModal: false
    });
  };

  setModalFalse = () => {
    if (this.state.showModal) {
      this.setState({
        showModal: false
      });
    }

    if (this.state.showFavModal) {
      this.setState({
        showFavModal: false
      });
    }
  };

  checkToken() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user is authenticated
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //Logout user
        this.logout();

        window.location.href = '/login';
      }
    }
  }

  // Start of render methods
  renderFavModal = () => {
    if (this.state.showFavModal) {
      return <Fav favorites={this.props.favorites} />;
    }
    return null;
  };

  renderInfoModal = () => {
    if (this.state.item === undefined) {
      return null;
    }

    let rawItems = Object.keys(this.state.item).map(key => {
      if (
        key === 'followers' ||
        key === 'genres' ||
        key === 'name' ||
        key === 'populatrity'
      ) {
        return (
          <li>
            {key.toUpperCase()} : {JSON.stringify(this.state.item[key])}
          </li>
        );
      }
    });

    return this.state.showModal ? (
      <Modal title="Raw artist info">
        <div className="container-fluid">{<div>{rawItems}</div>}</div>
      </Modal>
    ) : null;
  };

  render() {
    if (this.props.loading) {
      return (
        <div>
          <Navbar getFavorites={this.getFavorites} />
          <div style={{ textAlign: 'center' }}>
            <div className="row">
              <div className="col-md-12">
                <div
                  style={{ borderRadius: 0 }}
                  className="card card-body bg-info text-white mb-12 border-0"
                >
                  <div className="text-center">
                    <h1 className="display-4 text-center">
                      {this.props.auth.user.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Navbar getFavorites={this.getFavorites} />
        <div className="row">
          <div className="col-md-12">
            <div
              style={{ borderRadius: 0 }}
              className="card card-body bg-info text-white mb-12 border-0"
            >
              <div className="text-center">
                <h1 className="display-4 text-center">
                  {this.props.auth.user.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <SearchBar auth={this.props.auth} handleSubmit={this.handleSubmit} />
          <SearchResult
            searchResults={this.props.searchResults}
            showModal={this.showModal}
            addFavorite={this.addFavorite}
            auth={this.props.auth}
            disableModal={false}
            favoriteLoading={this.props.addFavoriteLoading}
          />
          <Pagination
            currentPage={this.props.currentPage}
            nextPageChange={this.nextPageChange}
            prevPageChange={this.prevPageChange}
            searchResults={this.props.searchResults}
          />
        </div>
        {this.renderInfoModal()}
        {this.renderFavModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.spotify.searchResults,
  auth: state.auth,
  currentPage: state.spotify.currentPage,
  search: state.spotify.search,
  favorites: state.favorites.favorites,
  loading: state.spotify.loading,
  addFavoriteLoading: state.favorites.isLoading
});

Dashboard.propTypes = {
  searchArtist: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  searchResults: PropTypes.object,
  auth: PropTypes.object,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { searchArtist, logoutUser, addFavorite, getFavorites, clearSearchResults }
)(withRouter(Dashboard));
