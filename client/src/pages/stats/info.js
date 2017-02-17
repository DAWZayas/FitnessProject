import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {retrieveStatsData} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';
import SportStats from './sportStats';
import RoutineStats from './routineStats';

const mapDispatchToProps = dispatch => ({
  fetchStatsData: payload => dispatch(retrieveStatsData(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.id,
  userObjectives: state.auth.user.objectives,
  sportStats: state.stats.sportStats,
});

const style = {
  navbarNav: {
    width: '100%',
    textAlign: 'center',
  },
  li: {
    float: 'none',
    display: 'inline-block',
  },
};

class StatsInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'Info',
      run: false,
      cycle: false,
      walk: false,
      routine: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  componentDidUpdate() {

  }

  // componentWillMount() {
  //   this.props.fetchRoutines();
  // }

  // componentDidMount() {
  //   if (this.state.round === this.state.routine.rounds) {
  //     this.setState({round: 'FINAL'});
  //   }
  // }

  handleClick = (e) => {
    e.preventDefault();
    this.setState(
      {
        tab: e.target.textContent,
      }
    );
    if (e.target.textContent !== 'Info') {
      this.props.fetchStatsData(
        {
          type: e.target.textContent,
          userId: this.props.user,
          actualDate: new Date(),
          sport: e.target.textContent === 'Routines' ? 'routine' : 'sport',
        });
    }
  };

  handleCollapse = (e) => {
    e.preventDefault();
    this.setState(
      {
        [e.target.id]: !this.state[e.target.id],
      }
    );
  };

  render() {
    return (
      <div className="card-block z-depth-1 grey lighten-5">
        <h2 className="card card-block text-xs-center">Stats/objectives</h2>
        <nav className="card navbar navbar-dark stats-bar-gradient">
          <ul className="nav navbar-nav" style={style.navbarNav}>
            <li className={`nav-item ${this.state.tab === 'Info' && 'active'}`} style={style.li}>
              <a href="#2" className="nav-link" onClick={this.handleClick}>Info</a>
            </li>
            <li className={`nav-item ${this.state.tab === 'Running' && 'active'}`} style={style.li}>
              <a href="#2" className="nav-link" onClick={this.handleClick}>Running</a>
            </li>
            <li className={`nav-item ${this.state.tab === 'Cycling' && 'active'}`} style={style.li}>
              <a href="#2" className="nav-link" onClick={this.handleClick}>Cycling</a>
            </li>
            <li className={`nav-item ${this.state.tab === 'Walking' && 'active'}`} style={style.li}>
              <a href="#2" className="nav-link" onClick={this.handleClick}>Walking</a>
            </li>
            <li className={`nav-item ${this.state.tab === 'Routines' && 'active'}`} style={style.li}>
              <a href="#2" className="nav-link" onClick={this.handleClick}>Routines</a>
            </li>
          </ul>
        </nav>
        {this.state.tab === 'Info' ?
          <div className="card-block text-xs-center">
            {this.props.userObjectives ?
              <div className="jumbotron light-gradient" style={{overflow: 'hidden'}}>
                <button className="btn light-grey-gradient white-text" id="run" onClick={this.handleCollapse}>
                  Running Objectives
                </button>
                {this.state.run ? <div className="card-block text-xs-center animated flipInX">
                  <h4 className="card-title">
                    Weekly <span className="tag badge grey">{Number(this.props.userObjectives.weekRunningKm).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Monthly <span className="tag badge grey">{(Number(this.props.userObjectives.weekRunningKm) * 4.33).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Annual <span className="tag badge grey">{(Number(this.props.userObjectives.weekRunningKm) * 52).toFixed(1)} km</span>
                  </h4>
                </div> : null}
                <button className="btn light-grey-gradient white-text" id="cycle" onClick={this.handleCollapse}>
                  Cycling Objectives
                </button>
                {this.state.cycle ? <div className="card-block text-xs-center animated flipInX">
                  <h4 className="card-title">
                    Weekly <span className="tag badge grey">{Number(this.props.userObjectives.weekCyclingKm).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Monthly <span className="tag badge grey">{(Number(this.props.userObjectives.weekCyclingKm) * 4.33).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Annual <span className="tag badge grey">{(Number(this.props.userObjectives.weekCyclingKm) * 52).toFixed(1)} km</span>
                  </h4>
                </div> : null}
                <button className="btn light-grey-gradient white-text" id="walk" onClick={this.handleCollapse}>
                  Walking Objectives
                </button>
                {this.state.walk ? <div className="card-block text-xs-center animated flipInX">
                  <h4 className="card-title">
                    Weekly <span className="tag badge grey">{Number(this.props.userObjectives.weekWalkingKm).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Monthly <span className="tag badge grey">{(Number(this.props.userObjectives.weekWalkingKm) * 4.33).toFixed(1)} km</span>
                  </h4>
                  <h4 className="card-title">
                    Annual <span className="tag badge grey">{(Number(this.props.userObjectives.weekWalkingKm) * 52).toFixed(1)} km</span>
                  </h4>
                </div> : null}
                <button className="btn light-grey-gradient white-text" id="routine" onClick={this.handleCollapse}>
                  Routine Objectives
                </button>
                {this.state.routine ? <div className="card-block text-xs-center animated flipInX">
                  <h4 className="card-title">
                    Weekly time <span className="tag badge grey">
                      {Math.floor(this.props.userObjectives.weekTimeExercises / 3600) + ' h ' +
                      Math.floor((this.props.userObjectives.weekTimeExercises % 3600) / 60) + ' m'}
                    </span></h4>
                </div> : null}
                <Link to="/objectives" className="btn btn-default">Add objectives!</Link>
              </div>
            : 'No objectives yet'}
          </div>
         : null}
        {this.state.tab !== 'Info' && this.state.tab !== 'Routines' ? <SportStats /> : null}
        {this.state.tab === 'Routines' ? <RoutineStats /> : null}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatsInfo);
