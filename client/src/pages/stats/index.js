import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {retrieveStatsData} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';

const mapDispatchToProps = dispatch => ({
  fetchStatsData: payload => dispatch(retrieveStatsData(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.id,
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
        type: this.state.tab,
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
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
