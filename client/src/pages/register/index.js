// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages
import {registerAction} from '../../store/actions';

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
  let nameInput;
  let surnameInput;
  let mailInput;
  let countryInput;
  let heightInput;
  let weightInput;

  const handleClick = (e) => {
    e.preventDefault();

    onRegisterClick({
      login: usernameInput.value,
      password: passwordInput.value,
      passwordRepeat: passwordInputRepeat.value,
      name: nameInput.value,
      surname: surnameInput.value,
      mail: mailInput.value,
      country: countryInput.value,
      height: heightInput.value,
      weight: weightInput.value,
    });
  };

  if (redirectToLogin) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToLogin());
  }

  return (
    <div className="jumbotron">

      <div className="row">
        <h3>Login Data</h3>
        <hr />

        <form>
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="inputPasswordRepeat">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPasswordRepeat"
              placeholder="Repeat password"
              ref={(i) => { passwordInputRepeat = i; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mailInput">Mail:</label>
            <input
              type="text"
              className="form-control"
              id="inputMail"
              placeholder="Mail"
              ref={(i) => { mailInput = i; }}
            />
          </div>
        </form>
      </div>
        <div className="row" style={{marginTop:20}}>
          <h3>User Data</h3>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="nameInput">Name:</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Name"
                ref={(i) => { nameInput = i; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surnameInput">Surname:</label>
              <input
                type="text"
                className="form-control"
                id="surnameInput"
                placeholder="Surname"
                ref={(i) => { surnameInput = i; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="countryInput">Country:</label>
              <input
                type="text"
                className="form-control"
                id="countryInput"
                placeholder="Country"
                ref={(i) => { countryInput = i; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="heightInput">Height:</label>
              <input
                type="text"
                className="form-control"
                id="heightInput"
                placeholder="Name"
                ref={(i) => { heightInput = i; }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="weightInput">Weight:</label>
              <input
                type="text"
                className="form-control"
                id="weightInput"
                placeholder="Weight"
                ref={(i) => { weightInput = i; }}
              />
            </div>
            <button type="submit" className="btn btn-default" onClick={handleClick}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
