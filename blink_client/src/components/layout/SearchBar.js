import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: 40 }} className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Artist Name"
            onChange={this.handleOnChange}
            value={this.state.name}
            id="name"
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                this.props.handleSubmit(this.state.name);
              }
            }}
          />

          <div className="input-group-append">
            <button
              onClick={() => this.props.handleSubmit(this.state.name)}
              className="btn btn-secondary"
              type="button"
            >
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SearchBar;
