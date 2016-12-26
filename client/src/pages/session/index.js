import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer} from '../../components/session';
import {finishSession} from '../../store/actions';

const mapStateToProps = (state) => ({
  sessionState: state.session.state,
});

const mapDispatchToProps = dispatch => ({
  onFinishSession: () => dispatch(finishSession()),
});

const started = (onFinishSession) => {
  const handleClick = (e) => {
    e.preventDefault();
    onFinishSession();
  };
  return (
    <div>
      <Timer />
      <button type="submit" className="btn btn-danger" onClick={handleClick}>Finish</button>
    </div>
  );
};

const Session = ({sessionState, onFinishSession}) => (
  <div className="jumbotron animated fadeInRight">
    <h1>Session page</h1>
    {sessionState === 1 ? <CountDown /> : ''}
    {sessionState === 2 ? started(onFinishSession) : ''}
    {sessionState === 3 ? 'finished' : ''}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Session);
