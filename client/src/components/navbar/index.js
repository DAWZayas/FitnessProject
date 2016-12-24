// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {Logout} from '../logout';

const mapStateToProps = (state) => ({
  route: state.routing.locationBeforeTransitions.pathname, // esto provoca el warning al logearse
  authenticated: state.auth.token !== null,
  userName: state.auth.user !== null && state.auth.user.login,
});

const yesAuth = (route, userName) => (
  <div>
    <ul className="nav navbar-nav float-xs-right">
      <li className="nav-item">
        <Link to="/profile" className="nav-link">Welcome {userName}</Link>
      </li>
      <Logout />
    </ul>
  </div>
);

const noAuth = (route) => (
  <ul className="nav navbar-nav float-xs-right">
    <li className={`nav-item ${route === '/login' && 'active'}`}>
      <Link to="/login" className="nav-link"><span className="glyphicon glyphicon-log-in" aria-hidden="true" /> Login</Link>
    </li>
    <li className={`nav-item ${route === '/register' && 'active'}`}>
      <Link to="/register" className="nav-link">Register</Link>
    </li>
  </ul>
);

const Navbar = ({route, authenticated, userName}) => (

  <nav className="navbar navbar-dark default-color" style={{marginBottom: '10px', marginTop: '10px'}}>

    <div className="container">
      <a className="navbar-brand">FitRun</a>
      {authenticated ? yesAuth(route, userName) : noAuth(route)}
    </div>
  </nav>

);

export default connect(mapStateToProps, null)(Navbar);
