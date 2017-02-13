// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages

import {updateUser} from '../../store/actions';

const mapStateToProps = state => ({
  redirectToProfile: state.auth.redirectToProfile,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  navToProfile: () => dispatch(push('/profile')),
  onUpdateClick: params => dispatch(updateUser(params)),
});

const UpdateUser = ({onUpdateClick, navToLogin, redirectToProfile, user, onClick}) => {
  let usernameInput;
  let passwordInput;
  let passwordInputRepeat;

  const handleClick = (e) => {
    e.preventDefault();

    onUpdateClick({
      login: usernameInput.value,
      password: passwordInput.value,
      passwordRepeat: passwordInputRepeat.value,
      id: user.id,
    });
  };

  if (redirectToProfile) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToProfile());
  }

  return (
    <div className="jumbotron animated fadeIn">
      <form>
        <div className="card card-block z-depth-1">
        <h4>Change user / password</h4>
        <div className="md-form">
          <i className="fa fa-user prefix" aria-hidden="true"></i>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
            ref={(i) => { usernameInput = i; }}
          />
        </div>
        <div className="md-form">
          <i className="fa fa-lock prefix" aria-hidden="true"></i>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            ref={(i) => { passwordInput = i; }}
          />
        </div>
        <div className="md-form">
          <i className="fa fa-lock prefix" aria-hidden="true"></i>
          <input
            type="password"
            className="form-control"
            id="inputPasswordRepeat"
            placeholder="Repeat password"
            ref={(i) => { passwordInputRepeat = i; }}
          />
        </div>
        </div>
        <div className="text-xs-center">
          <button type="submit" className="btn btn-default" onClick={handleClick}>Update</button>
          <Link to="/profile" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
