import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer, Distance, SummarySession} from '../../components/session';
import {finishSession, startSession} from '../../store/actions';

const COUNTDOWN_TIME = 3;

const mapStateToProps = (state) => ({
  sessionState: state.session.state,
  sessionId: state.session.id,
  sport: state.session.sport,
  user: state.auth.user.login,
});

const mapDispatchToProps = dispatch => ({
  onFinishSession: (payload) => dispatch(finishSession(payload)),
});

const started = (onFinishSession, sessionId, sport) => {
  let totalDistance = 0;
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(sessionId);
    onFinishSession({sessionId, totalDistance, finishDate: new Date()});
  };
  const distanceFunction = dist => totalDistance = dist;
  return (
    <div>
      <h2 className="card card-block text-xs-center">{sport} session</h2>
      <div className="card card-block text-xs-center">
        <Timer />
      </div>
      <Distance totalDistance={distanceFunction} />
      <div className="card card-block text-xs-center">
        <button type="submit" className="btn btn-deep-orange btn-block" onClick={handleClick}>Finish</button>
      </div>
    </div>
  );
};

const Session = ({sessionState, onFinishSession, sessionId, user, sport}) => (
  <div className="jumbotron animated fadeIn">
    {sessionState === 1 ?
      <div>
        <h1 className="card card-block text-xs-center">Session starts in...</h1>
        <CountDown time={COUNTDOWN_TIME} action={startSession} data={{user, sport}} />
      </div> : ''}
    {sessionState === 2 ? started(onFinishSession, sessionId, sport) : ''}
    {sessionState === 3 ? <SummarySession /> : ''}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Session);
