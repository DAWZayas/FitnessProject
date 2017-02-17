import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Chart from 'chart.js'
import {server as serverConfig} from '../../../config';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

const Home = () => (
  <div className="jumbotron animated fadeIn grey lighten-5">
    <div className="card">
      <div className="card-block light-gradient">
        <Link to="/sessions" className="float-xs-right">
          <img
            className="rounded z-depth-1 grey lighten-5"
            src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/activities/session.png`}
            width="100px" height="100px" alt="Generic"
          />
        </Link>
        <h4 className="card-title">Sport session</h4>
        <hr />
        <div className="card-text grey-text">
          Hundreds of kilometers await you so, let&apos;s go!
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-block light-gradient">
        <Link to="/routine" className="float-xs-right">
          <img
            className="rounded z-depth-1 grey lighten-5"
            src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/activities/routine.png`}
            width="100px" height="100px" alt="Generic"
          />
        </Link>
        <h4 className="card-title">Exercise routine</h4>
        <hr />
        <div className="card-text grey-text">
          Want to work your core? This is the place!
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-block light-gradient">
        <Link to="/stats/info" className="float-xs-right">
          <img
            className="rounded z-depth-1 grey lighten-5"
            src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/activities/chart.png`}
            width="100px" height="100px" alt="Generic"
          />
        </Link>
        <h4 className="card-title">Exercise statistics</h4>
        <hr />
        <div className="card-text grey-text">
          Check your training and beat your goals!
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-block light-gradient">
        <Link to="/athletes" className="float-xs-right">
          <img
            className="rounded z-depth-1 grey lighten-5"
            src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/activities/radar.png`}
            width="100px" height="100px" alt="Generic"
          />
        </Link>
        <h4 className="card-title">Athletes nearby</h4>
        <hr />
        <div className="card-text grey-text">
          Bored of exercising alone? Find athletes near you!
        </div>

      </div>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
