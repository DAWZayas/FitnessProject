import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {logoutAction} from '../../store/actions';

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => dispatch(logoutAction()),
  navToLogin: () => dispatch(push('/welcome')),
});

const Logout = ({onLogoutClick, navToLogin}) => {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogoutClick();
    setImmediate(() => navToLogin());
  };

  return (
    <li className="nav-item">
      <a href="#" onClick={handleLogoutClick} className="nav-link">Logout</a>
    </li>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  navToLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
