import React, {Component} from 'react';
import {connect} from 'react-redux';

import {retrieveStatsData} from '../../store/actions';
import {RoutineStatsResume} from '../../components/stats';

const mapDispatchToProps = dispatch => ({
  fetchStatsData: payload => dispatch(retrieveStatsData(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.id,
  sportStats: state.stats.sportStats,
});

class SportStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'Info',
    };
  }

  render() {
    return (
      <div className="">
        {Object.getOwnPropertyNames(this.props.sportStats).length > 0 ?
          <div>
            <RoutineStatsResume period={'Weekly'} periodStats={this.props.sportStats.week} />
            <RoutineStatsResume period={'Monthly'} periodStats={this.props.sportStats.month} />
            <RoutineStatsResume period={'Annual'} periodStats={this.props.sportStats.year} />
          </div>
        : null}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SportStats);
