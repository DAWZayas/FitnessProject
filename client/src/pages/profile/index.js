import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Profile = () => (
  <div className="jumbotron animated fadeInRight">
    <h1>Profile page</h1>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
