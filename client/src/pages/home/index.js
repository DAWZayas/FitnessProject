import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Home = () => (
  <div className="jumbotron">
    <h1>home page (logged)</h1>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
