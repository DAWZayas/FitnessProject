import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {logoutAction} from '../../store/actions';

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => dispatch(logoutAction()),
  navToLogin: () => dispatch(push('/login')),
});

const Logout = ({onLogoutClick, navToLogin}) => {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogoutClick();
    setImmediate(() => navToLogin());
  };

  return (
    <li>
      <a href="#" onClick={handleLogoutClick}>
        <span className="glyphicon glyphicon-log-out" aria-hidden="true" /> Logout</a>
    </li>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
  navToLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
