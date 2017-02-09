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

class SportStats extends Component {

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
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header blue-grey darken-1 white-text">
              Weekly stats
            </div>
            <div className="card-block text-xs-center">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Sessions</h4>
                <hr />
                {this.props.sportStats.week.numberSessions}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.week.velocity.toFixed(1)} km/h
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.week.time.hours + ' h, ' +
                this.props.sportStats.week.time.minutes + ' m, ' +
                this.props.sportStats.week.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.week.distanceDone / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.week.objective === 0 ? 'No objectives' :
                  this.props.sportStats.week.objective - this.props.sportStats.week.distanceDone < 0 ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.week.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                (Math.abs(this.props.sportStats.week.objective - this.props.sportStats.week.distanceDone) / 1000).toFixed(2) + ' km'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut1"
                  data0={this.props.sportStats.week.objectiveDone !== 0 ? Math.round(this.props.sportStats.week.objectiveDone) + '%' : 'N/A'}
                  data1={{n: this.props.sportStats.week.distanceDone, color: this.props.sportStats.week.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.week.objectiveDone < 100 && this.props.sportStats.week.objective !== 0 ?
                      this.props.sportStats.week.objective - this.props.sportStats.week.distanceDone : 0,
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
                {this.props.sportStats.month.numberSessions}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.month.velocity.toFixed(1)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.month.time.hours + ' h, ' +
                this.props.sportStats.month.time.minutes + ' m, ' +
                this.props.sportStats.month.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.month.distanceDone / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.month.objective === 0 ? 'No objectives' :
                  this.props.sportStats.month.objective - this.props.sportStats.month.distanceDone < 0 ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.month.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                (Math.abs(this.props.sportStats.month.objective - this.props.sportStats.month.distanceDone) / 1000).toFixed(2) + ' km'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut2"
                  data0={this.props.sportStats.month.objectiveDone !== 0 ? Math.round(this.props.sportStats.month.objectiveDone) + '%' : 'N/A'}
                  data1={{n: this.props.sportStats.month.distanceDone, color: this.props.sportStats.month.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.month.objectiveDone < 100 && this.props.sportStats.month.objective !== 0 ?
                      this.props.sportStats.month.objective - this.props.sportStats.month.distanceDone : 0,
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
                {this.props.sportStats.year.numberSessions}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Velocity</h4>
                <hr />
                {this.props.sportStats.year.velocity.toFixed(1)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.year.time.hours + ' h, ' +
                this.props.sportStats.year.time.minutes + ' m, ' +
                this.props.sportStats.year.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Distance</h4>
                <hr />
                {(this.props.sportStats.year.distanceDone / 1000).toFixed(2)} km
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.year.objective === 0 ? 'No objectives' :
                  this.props.sportStats.year.objective - this.props.sportStats.year.distanceDone < 0 ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.year.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                (Math.abs(this.props.sportStats.year.objective - this.props.sportStats.year.distanceDone) / 1000).toFixed(2) + ' km'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donut3"
                  data0={this.props.sportStats.year.objectiveDone !== 0 ? Math.round(this.props.sportStats.year.objectiveDone) + '%' : 'N/A'}
                  data1={{n: this.props.sportStats.year.distanceDone, color: this.props.sportStats.year.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.year.objectiveDone < 100  && this.props.sportStats.year.objective !== 0 ?
                      this.props.sportStats.year.objective - this.props.sportStats.year.distanceDone : 0,
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
export default connect(mapStateToProps, mapDispatchToProps)(SportStats);
