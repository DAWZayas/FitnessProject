// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Hello from 'hellojs';

// our packages
import {loginAction} from '../../store/actions';

import styles from './register-login.css';

Hello.init(
  {github: 'e43b56d1024cd4cc415f'},
  {redirect_uri: 'http://localhost:3000/redirect.html'}
);

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  onLoginClick: params => dispatch(loginAction(params)),
  navToHome: () => location.assign('/'),
});

const Login = ({onLoginClick, navToHome, token}) => {
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

  const githubToken = () => {
    Hello('github').login().then( function (x,y,z) {
      debugger;
      console.log(x,y,z)
    }, function(e) {
      debugger;
      console.log(e)
    });
  };

  return (
    <div className="jumbotron">
      <form>
        <div className="form-group">
          <div className={`${styles.login_register_header} z-depth-1`}>
            <h3>Login</h3>
          </div>
          <div className={styles.social}>
            <button type="button" className={`btn ${styles.github}`} onClick={githubToken}>github</button>
            <button type="button" className={`btn ${styles.google}`}>google</button>
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
