import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Redux imports
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

class Navbar extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a className="navbar-brand" href="#">
          Grow Search
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <button
              style={{ border: '0px solid transparent' }}
              onClick={this.props.getFavorites}
              type="button"
              className="btn btn-outline-light"
            >
              Favorites
            </button>
            <span style={{ marginLeft: 20, marginBottom: 5 }} />
            <button
              style={{ border: '0px solid transparent' }}
              onClick={this.logout}
              type="button"
              className="btn btn-outline-light"
            >
              Logout
            </button>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(withRouter(Navbar));
