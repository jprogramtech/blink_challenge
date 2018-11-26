import React, { Component } from 'react';

class ErrorAlert extends Component {
  render() {
    let error =
      'error' in this.props ? this.props.error.error : 'Error please try again';
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Holy guacamole!</strong> {error}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default ErrorAlert;
