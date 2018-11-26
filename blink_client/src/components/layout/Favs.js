import React, { Component } from 'react';
import Modal from '../common/Modal';

class Favs extends Component {
  renderCard(item) {
    const imageUrl = item['imageUrl'] ? item['imageUrl'] : null;
    const followers = item['followers'] ? item['followers'] : 0;

    return (
      <div key={item._id} className="col-md-3">
        <div className="card">
          <img className="card-img-top" src={imageUrl} alt="No Image Found" />
          <div className="card-body">
            <h4 className="card-title">{item.name}</h4>
            <p className="card-text">Followers: {followers}</p>
            <a href={item.externalUrl} target="_blank" className="card-link">
              Spotify Page
            </a>
          </div>
        </div>
        <br />
      </div>
    );
  }

  render() {
    const { favorites } = this.props;

    let cardItems =
      Object.keys(favorites).length === 0
        ? null
        : Object.keys(favorites).map(key => this.renderCard(favorites[key]));

    return (
      <Modal title="Favorites">
        <div className="row">{cardItems}</div>
      </Modal>
    );
  }
}

export default Favs;
