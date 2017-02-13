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
  let weekTimeExercises;

  const handleClick = (e) => {
    e.preventDefault();

    onUpdateClick({
      weekRunningKm: weekRunningKm.value,
      weekCyclingKm: weekCyclingKm.value,
      weekWalkingKm: weekWalkingKm.value,
      finalWeight: finalWeight.value,
      weekTimeExercises: weekTimeExercises.value,
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
        <h4 >General objectives</h4>
        <div className="md-form">
          <img
            src="../../../static/images/weight.png"
            className="prefix"
            style={{width: '40px'}}
          />
          <input
            type="number"
            className="form-control"
            id="inputFinalWeight"
            placeholder="Ideal weight"
            ref={(i) => { finalWeight = i; }}
          />
        </div>
        </div>
        <div className="card card-block z-depth-1">
        <h4>Sport objectives</h4>
        <div className="md-form">
          <img
            src="../../../static/images/run.png"
            className="prefix"
            style={{width: '40px'}}
          />
          <input
            type="number"
            className="form-control"
            id="inputWeekRunningKm"
            placeholder="Weekly kilometers running"
            ref={(i) => { weekRunningKm = i; }}
          />
        </div>
        <div className="md-form">
          <img
            src="../../../static/images/bike.png"
            className="prefix"
            style={{width: '40px'}}
          />
          <input
            type="number"
            className="form-control"
            id="inputWeekCyclingKm"
            placeholder="Weekly kilometers pedaling"
            ref={(i) => { weekCyclingKm = i; }}
          />
        </div>
        <div className="md-form">
          <img
            src="../../../static/images/walk.png"
            className="prefix"
            style={{width: '40px'}}
          />
          <input
            type="number"
            className="form-control"
            id="inputWeekWalkingKm"
            placeholder="Weekly kilometers walking"
            ref={(i) => { weekWalkingKm = i; }}
          />
        </div>
        </div>
        <div className="card card-block z-depth-1">
        <h4>Routine objectives</h4>
        <div className="md-form">
          <img
            src="../../../static/images/routine.png"
            className="prefix"
            style={{width: '40px'}}
          />
          <input
            type="time"
            className="form-control"
            id="inputweekTimeExercises"
            placeholder="Weekly exercise time"
            ref={(i) => { weekTimeExercises = i; }}
          />
        </div>
        </div>
        <div className="text-xs-center">
          <button type="submit" className="btn btn-default" onClick={handleClick}>Update</button>
          <Link to="/stats/info" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Objectives);
