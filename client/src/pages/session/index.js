import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer, Distance, SummarySession} from '../../components/session';
import {finishSession} from '../../store/actions';

const mapStateToProps = (state) => ({
  sessionState: state.session.state,
  sessionId: state.session.id,
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
      <Distance />
      <button type="submit" className="btn btn-danger" onClick={handleClick}>Finish</button>
    </div>
  );
};

const Session = ({sessionState, onFinishSession, sessionId}) => (
  <div className="jumbotron animated fadeInRight">
    <h1>Session page</h1>
    {sessionState === 1 ? <CountDown /> : ''}
    {sessionState === 2 ? started(onFinishSession, sessionId) : ''}
    {sessionState === 3 ? <SummarySession /> : ''}
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Session);
