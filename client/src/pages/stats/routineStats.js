import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {retrieveStatsData} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';
import {DonutChart, RadarChart} from '../../components/stats';

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

const toSeconds = ({seconds, minutes, hours}) =>
  Number(seconds) + (Number(minutes) * 60) + (Number(hours) * 3600);

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
      <div className="">
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header light-grey-gradient white-text">
              Weekly stats
            </div>
            <div className="card-block text-xs-center light-gradient">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Routines</h4>
                <hr />
                {this.props.sportStats.week.numberRoutines}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.week.time.hours + ' h, ' +
                this.props.sportStats.week.time.minutes + ' m, ' +
                this.props.sportStats.week.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.week.objective === 0 ? 'No objectives' :
                  this.props.sportStats.week.objectiveVariance.surplus ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.week.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                  this.props.sportStats.week.objectiveVariance.hours + ' h, ' +
                  this.props.sportStats.week.objectiveVariance.minutes + ' m, ' +
                  this.props.sportStats.week.objectiveVariance.seconds + ' s'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donutR1"
                  data0={this.props.sportStats.week.objectiveDone !== 0 ? Math.round(this.props.sportStats.week.objectiveDone) + '%' : 'N/A'}
                  data1={{n: toSeconds(this.props.sportStats.week.time), color: this.props.sportStats.week.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.week.objectiveDone < 100 && this.props.sportStats.week.objective !== 0 ?
                      toSeconds(this.props.sportStats.week.objectiveVariance) : 0,
                    color: '#F36666'}}
                />
              </div>
              <div className="card-text col-xs-12">
                <hr />
                <h4 className="card-title">Total exercises <span className="tag badge grey">{this.props.sportStats.week.numberExercises}</span></h4>
                <hr />
              </div>
              <div className="card-text col-xs-12">
                <RadarChart
                  key={Math.random()}
                  canvasId="radar1"
                  data={this.props.sportStats.week.exercises}
                />
              </div>
            </div>
          </div>
        : ''}
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header light-grey-gradient white-text">
              Monthly stats
            </div>
            <div className="card-block text-xs-center light-gradient">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Routines</h4>
                <hr />
                {this.props.sportStats.month.numberRoutines}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.month.time.hours + ' h, ' +
                this.props.sportStats.month.time.minutes + ' m, ' +
                this.props.sportStats.month.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.month.objective === 0 ? 'No objectives' :
                  this.props.sportStats.month.objectiveVariance.surplus ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.month.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                  this.props.sportStats.month.objectiveVariance.hours + ' h, ' +
                  this.props.sportStats.month.objectiveVariance.minutes + ' m, ' +
                  this.props.sportStats.month.objectiveVariance.seconds + ' s'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donutR2"
                  data0={this.props.sportStats.month.objectiveDone !== 0 ? Math.round(this.props.sportStats.month.objectiveDone) + '%' : 'N/A'}
                  data1={{n: toSeconds(this.props.sportStats.month.time), color: this.props.sportStats.month.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.month.objectiveDone < 100 && this.props.sportStats.month.objective !== 0 ?
                      toSeconds(this.props.sportStats.month.objectiveVariance) : 0,
                    color: '#F36666'}}
                />
              </div>
              <div className="card-text col-xs-12">
                <hr />
                <h4 className="card-title">Total exercises <span className="tag badge grey">{this.props.sportStats.month.numberExercises}</span></h4>
                <hr />
              </div>
              <div className="card-text col-xs-12">
                <RadarChart
                  key={Math.random()}
                  canvasId="radar2"
                  data={this.props.sportStats.month.exercises}
                />
              </div>
            </div>
          </div>
        : ''}
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div className="card" style={{overflow: 'hidden'}}>
            <div className="card-header light-grey-gradient white-text">
              Annual stats
            </div>
            <div className="card-block text-xs-center light-gradient">
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Routines</h4>
                <hr />
                {this.props.sportStats.year.numberRoutines}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">Time</h4>
                <hr />
                {this.props.sportStats.year.time.hours + ' h, ' +
                this.props.sportStats.year.time.minutes + ' m, ' +
                this.props.sportStats.year.time.seconds + ' s'}
              </div>
              <div className="card card-block col-xs-6">
                <h4 className="card-title">
                  {this.props.sportStats.year.objective === 0 ? 'No objectives' :
                  this.props.sportStats.year.objectiveVariance.surplus ? 'Surplus' : 'Remaining'}
                </h4>
                <hr />
                {this.props.sportStats.year.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
                  this.props.sportStats.year.objectiveVariance.hours + ' h, ' +
                  this.props.sportStats.year.objectiveVariance.minutes + ' m, ' +
                  this.props.sportStats.year.objectiveVariance.seconds + ' s'}
              </div>
              <div className="card-text col-xs-6">
                <DonutChart
                  key={this.state.tab}
                  canvasId="donutR3"
                  data0={this.props.sportStats.year.objectiveDone !== 0 ? Math.round(this.props.sportStats.year.objectiveDone) + '%' : 'N/A'}
                  data1={{n: toSeconds(this.props.sportStats.year.time), color: this.props.sportStats.year.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
                  data2={{
                    n: this.props.sportStats.year.objectiveDone < 100 && this.props.sportStats.year.objective !== 0 ?
                      toSeconds(this.props.sportStats.year.objectiveVariance) : 0,
                    color: '#F36666'}}
                />
              </div>
              <div className="card-text col-xs-12">
                <hr />
                <h4 className="card-title">Total exercises <span className="tag badge grey">{this.props.sportStats.year.numberExercises}</span></h4>
                <hr />
              </div>
              <div className="card-text col-xs-12">
                <RadarChart
                  key={Math.random()}
                  canvasId="radar3"
                  data={this.props.sportStats.year.exercises}
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
