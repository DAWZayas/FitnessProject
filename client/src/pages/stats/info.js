import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {retrieveStatsData} from '../../store/actions';

import SportStats from './sportStats';
import RoutineStats from './routineStats';
import {ButtonObjective, ButtonObjectiveRoutine, InfoStatsBar} from '../../components/stats';

const mapDispatchToProps = dispatch => ({
  fetchStatsData: payload => dispatch(retrieveStatsData(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.id,
  userObjectives: state.auth.user.objectives,
  sportStats: state.stats.sportStats,
});

class StatsInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'Info',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (tab) => {
    // e.preventDefault();
    this.setState(
      {
        tab,
      }
    );
    if (tab !== 'Info') {
      this.props.fetchStatsData(
        {
          type: tab,
          userId: this.props.user,
          actualDate: new Date(),
          sport: tab === 'Routines' ? 'routine' : 'sport',
        });
    }
  };

  render() {
    return (
      <div className="card-block z-depth-1 grey lighten-5">
        <h2 className="card card-block text-xs-center">Stats/objectives</h2>
        <InfoStatsBar tab={this.state.tab} handleTab={this.handleClick} />
        {this.state.tab === 'Info' ?
          <div className="card-block text-xs-center">
            {this.props.userObjectives ?
              <div className="jumbotron light-gradient container">
                <ButtonObjective userObjectives={this.props.userObjectives.weekRunningKm} sport={'Running'} />
                <ButtonObjective userObjectives={this.props.userObjectives.weekCyclingKm} sport={'Cycling'} />
                <ButtonObjective userObjectives={this.props.userObjectives.weekWalkingKm} sport={'Walking'} />
                <ButtonObjectiveRoutine userObjectives={this.props.userObjectives.weekTimeExercises} sport={'Routine'} />
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
