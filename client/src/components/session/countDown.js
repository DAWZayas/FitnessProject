import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  actionToDispatch: (payload, action) => dispatch(action(payload)),
});

const mapStateToProps = state => ({
  pos: state.session.position,
  sessionId: state.session.id,
});

const countDownStyle = {
  fontFamily: 'sans-serif',
  display: 'inline-block',
  fontWeight: '100',
  textAlign: 'center',
  fontSize: '100px',
};

class CountDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      timer: setInterval(
        () => this.setState({time: --this.state.time}),
        1000
      ),
    };
  }

  componentDidUpdate() {
    const {actionToDispatch} = this.props;
    if (this.state.time === 0) {
      clearInterval(this.state.timer);
      actionToDispatch({...this.props.data, startDate: new Date(), pos: JSON.stringify(this.props.pos)}, this.props.action);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    return (
      <div className="container text-xs-center">
        <div className="" style={countDownStyle}>
          <span >{this.state.time}</span>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
