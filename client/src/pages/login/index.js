// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {client as clientConfig} from '../../../config';

import hello from 'hellojs';

// our packages
import {loginAction, loginOauthAction} from '../../store/actions';

import styles from './register-login.css';

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onLoginClick: params => dispatch(loginAction(params)),
  navToHome: () => location.assign('/'),
  oauthLogin: payload => dispatch(loginOauthAction(payload)),
});

const Login = ({onLoginClick, navToHome, token, oauthLogin}) => {
  let usernameInput;
  let passwordInput;
  let rememberInput;

  const handleClick = (e) => {
    e.preventDefault();

    onLoginClick({
      login: usernameInput.value,
      password: passwordInput.value,
      remember: rememberInput.checked,
    });
  };

  if (token) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToHome());
  }

  const googleToken = () => {
    hello.init(
      {google: '907309639379-aoppqn9rh4b02uoi3r07rtv19nh4jd4j.apps.googleusercontent.com'},
      {redirect_uri: `http://${clientConfig.host}/redirect.html`}
    );
    oauthLogin({provider: 'google'});
  };

  return (
    <div className="jumbotron">
      <form>
        <div className="form-group">
          <div className={`${styles.login_register_header} z-depth-1`}>
            <h3>Login</h3>
          </div>
          <div className={styles.social}>
            <button type="button" className={`btn ${styles.github}`}>github</button>
            <button type="button" className={`btn ${styles.google}`} onClick={googleToken} >google</button>
            <button type="button" className={`btn ${styles.facebook}`}>facebook</button>
            <div className={styles.division}>
              <div className={`${styles.line} ${styles.l}`}></div>
              <span>or</span>
              <div className={`${styles.line} ${styles.r}`}></div>
            </div>
          </div>
          <label htmlFor="inputUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
            ref={(i) => { usernameInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            ref={(i) => { passwordInput = i; }}
          />
        </div>
        <div className="checkbox">
          <label htmlFor="inputRemember">
            <input
              type="checkbox"
              id="inputRemember"
              ref={(i) => { rememberInput = i; }}
            /> Remember me
          </label>
        </div>
        <div className={styles.login_register_footer}>
          <button type="submit" className="btn btn-default" onClick={handleClick}>Login</button>
          <br></br><br></br>
          <p>Looking to <Link to="/register">register</Link>?</p>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
