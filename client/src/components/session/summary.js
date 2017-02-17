import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const mapStateToProps = state => ({
  session: state.session,
});

const SummarySession = ({session}) => (
  <div className="card text-xs-center">
    <div className="card-header light-grey-gradient white-text">
      <h3>Session summary</h3>
    </div>
    <div className="card-block light-gradient">
      <ul className="list-group">
        <li className="list-group-item"><h4>User: <span className="tag badge grey">{session.user}</span></h4></li>
        <li className="list-group-item"><h4>Sport: <span className="tag badge grey">{session.sport}</span></h4></li>
        <li className="list-group-item"><h4>Start: <span className="tag badge grey">{new Date(session.startTime).toLocaleDateString() + ' - ' + new Date(session.startTime).toLocaleTimeString()}</span></h4></li>
        <li className="list-group-item"><h4>End: <span className="tag badge grey">{new Date(session.endTime).toLocaleDateString() + ' - ' + new Date(session.endTime).toLocaleTimeString()}</span></h4></li>
        <li className="list-group-item"><h4>Duration:&nbsp;
        <span className="tag badge grey">
          {session.duration.hours < 10 ? '0' + session.duration.hours : session.duration.hours}&nbsp;h&nbsp;
          {session.duration.minutes < 10 ? '0' + session.duration.minutes : session.duration.minutes}&nbsp;m&nbsp;
          {session.duration.seconds < 10 ? '0' + session.duration.seconds : session.duration.seconds}&nbsp;s
          </span></h4>
        </li>
        <li className="list-group-item"><h4>Distance: <span className="tag badge grey">{(session.distance / 1000).toFixed(2)} km</span></h4></li>
        <li className="list-group-item"><h4>Velocity: <span className="tag badge grey">{session.velocity.toFixed(1)} km/h</span></h4></li>
      </ul>
      <Link to="/" className="btn btn-default">Back to home</Link>
    </div>
  </div>
);

export default connect(mapStateToProps, null)(SummarySession);
