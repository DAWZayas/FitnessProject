import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const mapStateToProps = state => ({
  session: state.session,
});

const SummarySession = ({session}) => (
  <div className="card text-xs-center">
    <div className="card-header default-color-dark white-text">
        <b>Summary session</b>
    </div>
    <div className="card-block">
      <ul className="list-group">
        <li className="list-group-item">User: {session.user}</li>
        <li className="list-group-item">Sport: {session.sport}</li>
        <li className="list-group-item">Start: {session.startTime}</li>
        <li className="list-group-item">End: {session.endTime}</li>
        <li className="list-group-item">Duration:&nbsp;
          {session.duration.hours < 10 ? '0' + session.duration.hours : session.duration.hours}&nbsp;h&nbsp;
          {session.duration.minutes < 10 ? '0' + session.duration.minutes : session.duration.minutes}&nbsp;m&nbsp;
          {session.duration.seconds < 10 ? '0' + session.duration.seconds : session.duration.seconds}&nbsp;s
        </li>
        <li className="list-group-item">Distance: {session.distance} m</li>
        <li className="list-group-item">Velocity: {session.velocity} km/h</li>
      </ul>
      <Link to="/" className="btn btn-default">Back to home</Link>
    </div>
  </div>
);

export default connect(mapStateToProps, null)(SummarySession);
