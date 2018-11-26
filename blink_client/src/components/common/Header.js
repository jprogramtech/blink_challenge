import React, { Component } from 'react';
import SearchBar from '../layout/SearchBar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { marginBottom: 102 }
    };
  }

  componentDidMount() {
    let mediaQuery = window.matchMedia('(max-width: 600px)');

    if (mediaQuery.matches) {
      this.setState({
        style: { marginBottom: 5 }
      });
    }

    window.addEventListener('resize', () => {
      const mediaQuery = window.matchMedia('(max-width: 600px)');
      if (mediaQuery.matches) {
        if (this.state.style.marginBottom !== 5) {
          this.setState({
            style: { marginBottom: 5 }
          });
        }
      } else {
        if (this.state.style.marginBottom === 5) {
          this.setState({
            style: { marginBottom: 102 }
          });
        }
      }
    });
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container searchBar" style={this.state.style}>
          <h1 className="display-4">Grow Search</h1>
          <p>A place to search, save and grow your favorite spotify artists</p>
        </div>
        <div className="container">
          <SearchBar
            auth={this.props.auth}
            handleSubmit={this.props.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default Header;
