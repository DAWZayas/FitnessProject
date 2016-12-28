import React, {Component} from 'react';
import {connect} from 'react-redux';

import {startSession} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  startSportSession: (payload) => dispatch(startSession(payload)),
});

const mapStateToProps = state => ({
  user: state.auth.user.login,
});

const countDownStyle = {
  fontFamily: 'sans-serif',
  display: 'inline-block',
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '50px',
};

class CountDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 5,
      timer: setInterval(
        () => this.setState({time: --this.state.time}),
        1000
      ),
    };
  }

  componentDidUpdate() {
    const {startSportSession} = this.props;
    if (this.state.time === 0) {
      clearInterval(this.state.timer);
      startSportSession({user: this.props.user, sport: 'Running'});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div className="container">
        <div className="text-center" style={countDownStyle}>
          <span >{this.state.time}</span>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountDown);