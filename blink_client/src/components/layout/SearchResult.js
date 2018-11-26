import React, { Component } from 'react';
import Card from '../card/Card';

class SearchResult extends Component {
  render() {
    const { searchResults } = this.props;

    let cardItems =
      searchResults === null || Object.keys(searchResults).length === 0
        ? null
        : Object.keys(searchResults.artists.items).map(key => (
            <Card
              key={key}
              item={searchResults.artists.items[key]}
              showModal={this.props.showModal}
              addFavorite={this.props.addFavorite}
              auth={this.props.auth}
              favoriteLoading={this.props.favoriteLoading}
            />
          ));

    return (
      <div style={{ marginTop: 20 }}>
        <div className="row">{cardItems}</div>
      </div>
    );
  }
}

export default SearchResult;
