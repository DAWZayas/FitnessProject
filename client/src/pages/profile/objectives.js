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

const Objectives = ({onUpdateClick, redirectToProfile, user}) => {
  let weekRunningKm;
  let weekCyclingKm;
  let weekWalkingKm;
  let finalWeight;
  let activeTimeDay;
  let weekExercises;

  const handleClick = (e) => {
    e.preventDefault();

    onUpdateClick({
      weekRunningKm: weekRunningKm.value,
      weekCyclingKm: weekCyclingKm.value,
      weekWalkingKm: weekWalkingKm.value,
      finalWeight: finalWeight.value,
      activeTimeDay: activeTimeDay.value,
      weekExercises: weekExercises.value,
      id: user.id,
    });
  };

  if (redirectToProfile) {
    // TODO: figure out a better way to do nav
    setImmediate(() => navToProfile());
  }

  return (
      <form>
        <h3>General objectives</h3>
        <div className="form-group">
          <label htmlFor="inputFinalWeight">finalWeight</label>
          <input
            type="number"
            className="form-control"
            id="inputFinalWeight"
            placeholder="finalWeight"
            ref={(i) => { finalWeight = i; }}
          />
        </div>
        <h3>Session objectives</h3>
        <div className="form-group">
          <label htmlFor="inputWeekRunningKm">weekRunningKm:</label>
          <input
            type="number"
            className="form-control"
            id="inputWeekRunningKm"
            placeholder="weekRunningKm"
            ref={(i) => { weekRunningKm = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputWeekCyclingKm">weekCyclingKm:</label>
          <input
            type="number"
            className="form-control"
            id="inputWeekCyclingKm"
            placeholder="weekCyclingKm"
            ref={(i) => { weekCyclingKm = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputWeekWalkingKm">weekWalkingKm:</label>
          <input
            type="number"
            className="form-control"
            id="inputWeekWalkingKm"
            placeholder="weekWalkingKm"
            ref={(i) => { weekWalkingKm = i; }}
          />
        </div>
        <h3>Routines objectives</h3>
        <div className="form-group">
          <label htmlFor="inputActiveTimeDay">activeTimeDay</label>
          <input
            type="number"
            className="form-control"
            id="inputActiveTimeDay"
            placeholder="activeTimeDay"
            ref={(i) => { activeTimeDay = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputWeekExercises">weekExercises</label>
          <input
            type="number"
            className="form-control"
            id="inputWeekExercises"
            placeholder="weekExercises"
            ref={(i) => { weekExercises = i; }}
          />
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Update objectives</button>
      </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Objectives);
