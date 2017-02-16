import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {prepareSession} from '../../store/actions';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onPrepareSession: (payload) => dispatch(prepareSession(payload)),
});

const Sessions = ({onPrepareSession}) => {
  const handleClickRunning = (e) => {
    onPrepareSession('Running');
  };
  const handleClickCycling = (e) => {
    onPrepareSession('Cycling');
  };
  const handleClickWalking = (e) => {
    onPrepareSession('Walking');
  };
  return (
    <div className="jumbotron animated fadeIn">
      <h3 className="card card-block text-xs-center">Choose your sport session</h3>
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Running session</h4>
          <Link to="/session" className="btn btn-default" onClick={handleClickRunning}>Go!</Link>
        </div>
      </div>
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Cycling session</h4>
          <Link to="/session" className="btn btn-default" onClick={handleClickCycling}>Go!</Link>
        </div>
      </div>
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Walking session</h4>
          <Link to="/session" className="btn btn-default" onClick={handleClickWalking}>Go!</Link>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
