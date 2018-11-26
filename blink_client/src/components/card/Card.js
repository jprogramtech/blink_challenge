import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';

class Card extends Component {
  render() {
    const { item, favoriteLoading } = this.props;

    if (favoriteLoading) {
      return <Spinner />;
    }

    let addFavorite = this.props.auth.isAuthenticated ? (
      <button
        style={{ marginLeft: 20, marginTop: 10 }}
        type="button"
        className="btn btn-info"
        onClick={() => this.props.addFavorite(item)}
      >
        Add To Favorite
      </button>
    ) : null;

    let rawInfo = this.props.auth.isAuthenticated ? (
      <button
        onClick={() => this.props.showModal(item)}
        type="button"
        className="btn btn-link"
      >
        View raw info
      </button>
    ) : null;

    return (
      <div className="col-md-3">
        <div className="card">
          <img
            className="card-img-top"
            src={item.images[0] ? item.images[0]['url'] : ''}
            alt="No Image Found"
          />
          <div className="card-body">
            <h4 className="card-title">{item.name}</h4>
            <p className="card-text">Followers: {item.followers.total}</p>
            <a
              href={item.external_urls.spotify}
              target="_blank"
              className="card-link"
            >
              Spotify Page
            </a>

            {addFavorite}
            {rawInfo}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default withRouter(Card);
