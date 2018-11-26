import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Container from './components/layout/Container';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/layout/Dashboard';
import Favs from './components/layout/Favs';

// Redux imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setCurrentUser } from './redux/actions/authActions';
import { logoutUser } from '../src/redux/actions/authActions';

// Css Imports
import './App.css';

//utils
import setAuthToken from './utils/setAuthToken';

// Check for token
if (localStorage.jwtToken) {
  // Seat auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user is authenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Container} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/dashboard/favs" component={Favs} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
