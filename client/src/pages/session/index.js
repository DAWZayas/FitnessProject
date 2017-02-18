import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer, Distance, SummarySession} from '../../components/session';
import {finishSession, startSession} from '../../store/actions';

const COUNTDOWN_TIME = 5;

const mapStateToProps = (state) => ({
  sessionState: state.session.state,
  sessionId: state.session.id,
  sport: state.session.sport,
  user: state.auth.user.login,
  position: state.session.position,
});

const mapDispatchToProps = dispatch => ({
  onFinishSession: (payload) => dispatch(finishSession(payload)),
});

const Started = ({onFinishSession, sessionId, sport, position}) => {
  let totalDistance = 0;
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(sessionId);
    onFinishSession({sessionId, totalDistance, finishDate: new Date()});
  };
  const distanceFunction = dist => totalDistance = dist;
  return (
    <div>
      <h2 className="card card-block text-xs-center light-gradient">{sport} session</h2>
      <div className="card card-block text-xs-center light-gradient">
        <Timer />
      </div>
      {position ? <Distance totalDistance={distanceFunction} /> : null}
      <div className="card card-block text-xs-center light-gradient">
        <button type="submit" className="btn btn-deep-orange btn-block" onClick={handleClick}>Finish</button>
      </div>
    </div>
  );
};

const Session = ({sessionState, onFinishSession, sessionId, user, sport, position}) => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    {sessionState === 1 ?
      <div>
        <h1 className="card card-block text-xs-center">Session starts in...</h1>
        <CountDown time={COUNTDOWN_TIME} action={startSession} data={{user, sport}} />
      </div> : ''}
    {sessionState === 2 ?
      <Started onFinishSession={onFinishSession} sessionId={sessionId} sport={sport} position={position} /> : ''}
    {sessionState === 3 ? <SummarySession /> : ''}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Session);
