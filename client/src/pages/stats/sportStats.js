import React, {Component} from 'react';
import {connect} from 'react-redux';

import {retrieveStatsData} from '../../store/actions';
import {SportStatsResume} from '../../components/stats';

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
            <SportStatsResume period={'Weekly'} periodStats={this.props.sportStats.week} />
            <SportStatsResume period={'Monthly'} periodStats={this.props.sportStats.month} />
            <SportStatsResume period={'Annual'} periodStats={this.props.sportStats.year} />
          </div>
        : null}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SportStats);
