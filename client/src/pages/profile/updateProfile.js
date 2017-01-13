// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

// our packages

import {updateProfile} from '../../store/actions';

const mapStateToProps = state => ({
  redirectToProfile: state.auth.redirectToProfile,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  navToProfile: () => dispatch(push('/profile')),
  onUpdateClick: params => dispatch(updateProfile(params)),
});

const UpdateProfile = ({onUpdateClick, navToLogin, redirectToProfile, user, onClick}) => {
  let nameInput;
  let surnameInput;
  let ageInput;
  let emailInput;
  let countryInput;
  let weightInput;
  let heightInput;

  const handleClick = (e) => {
    e.preventDefault();

    onUpdateClick({
      name: nameInput.value,
      surname: surnameInput.value,
      age: ageInput.value,
      email: emailInput.value,
      country: countryInput.value,
      weight: weightInput.value,
      height: heightInput.value,
      id: user.id,
    });
  };

  if (redirectToProfile) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToProfile());
  }

  return (
      <form>
        <div className="form-group">
          <label htmlFor="inputName">Name:</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Name"
            ref={(i) => { nameInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputSurname">Surname:</label>
          <input
            type="text"
            className="form-control"
            id="inputSurname"
            placeholder="Surname"
            ref={(i) => { surnameInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAge">Age:</label>
          <input
            type="number"
            className="form-control"
            id="inputAge"
            placeholder="Age"
            ref={(i) => { ageInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email:</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            ref={(i) => { emailInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputCountry">Country:</label>
          <input
            type="text"
            className="form-control"
            id="inputCountry"
            placeholder="Country"
            ref={(i) => { countryInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputWeight">Weight:</label>
          <input
            type="number"
            className="form-control"
            id="inputWeight"
            placeholder="Your Weight in Kilogrammes"
            ref={(i) => { weightInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputHeight">Height:</label>
          <input
            type="number"
            className="form-control"
            id="inputHeight"
            placeholder="Your Height in centimetres"
            ref={(i) => { heightInput = i; }}
          />
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Update</button>
      </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
