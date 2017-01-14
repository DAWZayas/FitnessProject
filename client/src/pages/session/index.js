import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer, Distance, SummarySession} from '../../components/session';
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
  let totalDistance = 0;
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(sessionId);
    onFinishSession({sessionId, totalDistance, finishDate: new Date()});
  };
  const distanceFunction = dist => totalDistance = dist;
  return (
    <div>
      <Timer />
      <Distance totalDistance={distanceFunction} />
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
