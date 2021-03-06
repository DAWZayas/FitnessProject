// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {registerAction} from '../../store/actions';

import styles from './register-login.css';

const mapStateToProps = state => ({
  redirectToLogin: state.auth.redirectToLogin,
});

const mapDispatchToProps = dispatch => ({
  navToLogin: () => dispatch(push('/login')),
  onRegisterClick: params => dispatch(registerAction(params)),
});

const Register = ({onRegisterClick, navToLogin, redirectToLogin}) => {
  let usernameInput;
  let passwordInput;
  let passwordInputRepeat;

  const handleClick = (e) => {
    e.preventDefault();

    onRegisterClick({
      login: usernameInput.value,
      password: passwordInput.value,
      passwordRepeat: passwordInputRepeat.value,
    });
  };

  if (redirectToLogin) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToLogin());
  }

  return (
    <div className="jumbotron container">
      <form className="card-block z-depth-1 col-xs-12 col-md-8 offset-md-2 offset-lg-3 col-lg-6">
        <div className="form-group">
          <div className={`${styles.login_register_header} z-depth-1`}>
            <h2>Register</h2>
          </div>
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

        <div className={styles.login_register_footer}>
          <button type="submit" className="btn btn-default" onClick={handleClick}>Register</button>
          <br></br><br></br>
          <p>Already have an account? <Link to="/login">login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
