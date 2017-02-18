// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {client as clientConfig, server as serverConfig, auth as authConfig} from '../../../config';

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

  const handleClick = (e) => {
    e.preventDefault();

    onLoginClick({
      login: usernameInput.value,
      password: passwordInput.value,
    });
  };

  if (token) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToHome());
  }

  const googleToken = () => {
    hello.init(
      {google: authConfig.googleClientID},
      {redirect_uri: clientConfig.host === 'localhost' ?
        `${clientConfig.protocol}://${clientConfig.host}:${clientConfig.port}/redirect.html` :
        `${clientConfig.protocol}://${clientConfig.host}/redirect.html`,
      }
    );
    oauthLogin({provider: 'google'});
  };

  const githubToken = () => {
    hello.init(
      {github: authConfig.githubClientID},
      {oauth_proxy: `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/oauthproxy`,
        redirect_uri: clientConfig.host === 'localhost' ?
        `${clientConfig.protocol}://${clientConfig.host}:${clientConfig.port}/redirect.html` :
        `${clientConfig.protocol}://${clientConfig.host}/redirect.html`,
      }
    );
    oauthLogin({provider: 'github'});
  };


  return (
    <div className="jumbotron container">
      <form className="card-block z-depth-1 col-xs-12 col-md-8 offset-md-2 offset-lg-3 col-lg-6">
        <div className="form-group">
          <div className={`${styles.login_register_header} z-depth-1`}>
            <h2>Login</h2>
          </div>
          <div className={styles.social}>
            <button type="button" className={`btn ${styles.github}`} onClick={githubToken}>github</button>
            <button type="button" className={`btn ${styles.google}`} onClick={googleToken} >google</button>
            <button type="button" className={`btn ${styles.facebook}`}>facebook</button>
            <div className={styles.division}>
              <div className={`${styles.line} ${styles.l}`}></div>
              <span>or</span>
              <div className={`${styles.line} ${styles.r}`}></div>
            </div>
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
