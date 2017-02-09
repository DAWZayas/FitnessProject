import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Chart from 'chart.js'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Home = () => (
  <div className="jumbotron animated fadeIn">
    <div className="card">
      <div className="card-block">
        <Link to="/sessions" className="float-xs-right">
          <img className="rounded z-depth-1" src="http://localhost:8080/static/images/exercises/04.png" width="100px" height="100px" alt="Generic" />
        </Link>
        <h4 className="card-title">Sport session</h4>
        <Link to="/sessions" className="btn btn-default">Go!</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-block">
        <Link to="/routine" className="float-xs-right">
          <img className="rounded z-depth-1" src="http://localhost:8080/static/images/exercises/04.png" width="100px" height="100px" alt="Generic" />
        </Link>
        <h4 className="card-title">Exercise routine</h4>
        <Link to="/routine" className="btn btn-default">Go!</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-block">
        <Link to="/stats/info" className="float-xs-right">
          <img className="rounded z-depth-1" src="http://localhost:8080/static/images/exercises/04.png" width="100px" height="100px" alt="Generic" />
        </Link>
        <h4 className="card-title">Exercise statistics</h4>
        <Link to="/stats/info" className="btn btn-default">Go!</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-block">
        <Link to="/athletes" className="float-xs-right">
          <img className="rounded z-depth-1" src="http://localhost:8080/static/images/exercises/04.png" width="100px" height="100px" alt="Generic" />
        </Link>
        <h4 className="card-title">Athletes nearby</h4>
        <Link to="/athletes" className="btn btn-default">Go!</Link>
      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
