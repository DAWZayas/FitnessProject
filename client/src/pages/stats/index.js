import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {retrieveStatsData} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';
import DonutChart from '../../components/stats';

const mapDispatchToProps = dispatch => ({
  fetchStatsData: payload => dispatch(retrieveStatsData(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.id,
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

class Stats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'Info',
      filterText: '',
      showMine: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
    this.props.fetchStatsData(
      {
        type: e.target.textContent,
        userId: this.props.user,
        actualDate: new Date(),
      });
  };

  render() {
    return (
      <div className="container">
        <div className="card text-xs-center">
          <h1>Stats</h1>
        </div>
        <nav className="navbar navbar-dark default-color">
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
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header blue-grey darken-1 white-text">
              Weekly stats
            </div>
            <div className="card-block text-xs-center">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Sessions</h4>
                <hr />
                {this.props.sportStats.week.weekSessionsRunningNumber}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.week.weekVelocityRunning.toFixed(1)} km/h
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.week.weekTimeRunning.hours + ' h, ' +
                this.props.sportStats.week.weekTimeRunning.minutes + ' m, ' +
                this.props.sportStats.week.weekTimeRunning.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.week.weekDistanceRunning / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Remaining</h4>
                <hr />
                {((this.props.sportStats.week.weekRunObj - this.props.sportStats.week.weekDistanceRunning) / 1000).toFixed(2)} km
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut1"
                  data0={this.props.sportStats.week.weekRunObjDone !== 0 ? Math.round(this.props.sportStats.week.weekRunObjDone) + '%' : '100%'}
                  data1={{n: this.props.sportStats.week.weekDistanceRunning, color: '#90EE90'}}
                  data2={{
                    n: this.props.sportStats.week.weekRunObjDone < 100 ?
                      this.props.sportStats.week.weekRunObj - this.props.sportStats.week.weekDistanceRunning : 0,
                    color: '#F36666'}}
                />
              </div>
            </div>
          </div>
        : ''}
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header blue-grey darken-1 white-text">
              Monthly stats
            </div>
            <div className="card-block text-xs-center">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Sessions</h4>
                <hr />
                {this.props.sportStats.month.monthSessionsRunningNumber}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.month.monthVelocityRunning.toFixed(1)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.month.monthTimeRunning.hours + ' h, ' +
                this.props.sportStats.month.monthTimeRunning.minutes + ' m, ' +
                this.props.sportStats.month.monthTimeRunning.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.month.monthDistanceRunning / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Remaining</h4>
                <hr />
                {((this.props.sportStats.month.monthRunObj - this.props.sportStats.month.monthDistanceRunning) / 1000).toFixed(2)} km
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut2"
                  data0={this.props.sportStats.month.monthRunObjDone !== 0 ? Math.round(this.props.sportStats.month.monthRunObjDone) + '%' : '0%'}
                  data1={{n: this.props.sportStats.month.monthDistanceRunning, color: '#90EE90'}}
                  data2={{
                    n: this.props.sportStats.month.monthRunObjDone < 100 && this.props.sportStats.month.monthRunObj !== 0 ?
                      this.props.sportStats.month.monthRunObj - this.props.sportStats.month.monthDistanceRunning : 0,
                    color: '#F36666'}}
                />
              </div>
            </div>
          </div>
        : ''}
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header blue-grey darken-1 white-text">
              Annual stats
            </div>
            <div className="card-block text-xs-center">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Sessions</h4>
                <hr />
                {this.props.sportStats.year.yearSessionsRunningNumber}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.year.yearVelocityRunning.toFixed(1)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.year.yearTimeRunning.hours + ' h, ' +
                this.props.sportStats.year.yearTimeRunning.minutes + ' m, ' +
                this.props.sportStats.year.yearTimeRunning.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.year.yearDistanceRunning / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Remaining</h4>
                <hr />
                {((this.props.sportStats.year.yearRunObj - this.props.sportStats.year.yearDistanceRunning) / 1000).toFixed(2)} km
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut3"
                  data0={this.props.sportStats.year.yearRunObjDone !== 0 ? Math.round(this.props.sportStats.year.yearRunObjDone) + '%' : '100%'}
                  data1={{n: this.props.sportStats.year.yearDistanceRunning, color: '#90EE90'}}
                  data2={{
                    n: this.props.sportStats.year.yearRunObjDone < 100 ?
                      this.props.sportStats.year.yearRunObj - this.props.sportStats.year.yearDistanceRunning : 0,
                    color: '#F36666'}}
                />
              </div>
            </div>
          </div>
        : ''}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
