import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer, Distance, SummarySession, Map} from '../../components/session';
import {finishSession, startSession} from '../../store/actions';

const COUNTDOWN_TIME = 3;

const mapStateToProps = (state) => ({
  sessionState: state.session.state,
  sessionId: state.session.id,
  user: state.auth.user.login,
});

const mapDispatchToProps = dispatch => ({
  onFinishSession: (payload) => dispatch(finishSession(payload)),
});

const started = (onFinishSession, sessionId) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(sessionId);
    onFinishSession({sessionId});
  };
  return (
    <div>
      <Timer />
      <Map />
      <Distance />
      <button type="submit" className="btn btn-danger" onClick={handleClick}>Finish</button>
    </div>
  );
};

const Session = ({sessionState, onFinishSession, sessionId, user}) => (
  <div className="jumbotron animated fadeInRight">
    <h1>Session page</h1>
    {sessionState === 1 ? <CountDown time={COUNTDOWN_TIME} action={startSession} data={{user, sport: 'Running'}} /> : ''}
    {sessionState === 2 ? started(onFinishSession, sessionId) : ''}
    {sessionState === 3 ? <SummarySession /> : ''}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Session);
