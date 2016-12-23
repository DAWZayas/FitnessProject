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
    <ul className="nav navbar-nav navbar-right">
      <li>
        <p className="navbar-text">Welcome <b><Link to="/profile" className="navbar-link">{userName}</Link></b></p>
      </li>
      <Logout />
    </ul>
  </div>
);

const noAuth = (route) => (
  <ul className="nav navbar-nav navbar-right">
    <li className={route === '/login' && 'active'}>
      <Link to="/login"><span className="glyphicon glyphicon-log-in" aria-hidden="true" /> Login</Link>
    </li>
    <li className={route === '/register' && 'active'}>
      <Link to="/register">Register</Link>
    </li>
  </ul>
);

const Navbar = ({route, authenticated, userName}) => (
  <nav className="navbar navbar-default navbar-dark bg-primary animated slideInLeft">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">Brand</Link>
      </div>
      {authenticated ? yesAuth(route, userName) : noAuth(route)}
    </div>
  </nav>
);

export default connect(mapStateToProps, null)(Navbar);
