import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Welcome = () => (
  <div className="jumbotron">
    <h1>welcome page</h1>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
