import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {CountDown, Timer} from '../../components/session';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Session = () => (
  <div className="jumbotron animated fadeInRight">
    <h1>Session page</h1>
    <CountDown />
    <Timer />
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Session);
