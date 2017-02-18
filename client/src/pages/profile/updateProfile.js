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
  let ageInput;
  let emailInput;
  let weightInput;
  let heightInput;
  let image;

  const handleClick = (e) => {
    e.preventDefault();
    onUpdateClick({
      name: nameInput.value,
      age: ageInput.value,
      email: emailInput.value,
      weight: weightInput.value,
      height: heightInput.value,
      id: user.id,
      image: encodeURIComponent(image),
    });
  };

  const handleFileChange = (ev) => {
    const reader = new FileReader();
    const file = ev.target.files[0];
    document.getElementById('uploadFile').textContent = ev.target.files[0].name;
    reader.onload = (e) => {
      image = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (redirectToProfile) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToProfile());
  }

  return (
    <div className="jumbotron animated fadeIn grey lighten-5">
      <form>
        <div className="card card-block z-depth-1 light-gradient">
          <h4>Change user profile</h4>
          <div className="md-form">
            <i className="fa fa-user prefix" aria-hidden="true"></i>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Name"
              ref={(i) => { nameInput = i; }}
            />
          </div>
          <div className="md-form">
            <i className="fa fa-envelope prefix" aria-hidden="true"></i>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              placeholder="Email"
              ref={(i) => { emailInput = i; }}
            />
          </div>
          <div className="md-form">
            <i className="fa fa-calendar-o prefix" aria-hidden="true"></i>
            <input
              type="number"
              className="form-control"
              id="inputAge"
              placeholder="Age"
              ref={(i) => { ageInput = i; }}
            />
          </div>
          <div className="md-form">
            <i className="fa fa-tag prefix" aria-hidden="true"></i>
            <input
              type="number"
              className="form-control"
              id="inputWeight"
              placeholder="Your Weight in Kilogrammes"
              ref={(i) => { weightInput = i; }}
            />
          </div>
          <div className="md-form">
            <i className="fa fa-male prefix" aria-hidden="true"></i>
            <input
              type="number"
              className="form-control"
              id="inputHeight"
              placeholder="Your Height in centimetres"
              ref={(i) => { heightInput = i; }}
            />
          </div>

          <label className="btn btn-blue-grey" style={{borderRadius: '50%'}}>
            <i className="fa fa-upload fa-2x" aria-hidden="true" /> Image
            <input type="file" accept="image/png" onChange={handleFileChange} style={{display: 'none'}} />
          </label>
          <span id="uploadFile"></span>
        </div>
        <div className="text-xs-center">
          <button type="submit" className="btn btn-default" onClick={handleClick}>Update</button>
          <Link to="/profile" className="btn btn-danger">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
