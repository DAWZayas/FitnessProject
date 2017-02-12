import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addObservable, removeObservable, prepareSession, resetAthletesPosition} from '../../store/actions';
import {registerSessionsObservable} from '../../store/realtime';

import {Map} from '../../components/session';

const mapStateToProps = state => ({
  userCoords: state.session.position,
  athletesObject: state.realtime,
  coordsFlag: state.session.posFlag,
});

const mapDispatchToProps = dispatch => ({
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: observable => dispatch(removeObservable(observable)),
  updateUserCoords: () => dispatch(prepareSession()),
  resetAthletesPosition: () => dispatch(resetAthletesPosition()),
});

class Athletes extends Component {

  constructor(props) {
    super(props);
    this.props.updateUserCoords();
    this.state = {
      flag: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.coordsFlag && this.state.flag) {
      const {addObservable} = this.props;
      const {payload: observable} = addObservable(registerSessionsObservable(nextProps.userCoords));
      this.setState({
        observable,
        flag: false,
      });
    }
  }

  componentWillUnmount() {
    const {observable} = this.state;
    this.props.removeObservable(observable);
    this.props.resetAthletesPosition();
  }

  render() {
    // console.log(this.props.userCoords);
    // console.log(this.props.marker);
    // console.log(this.props.athletesPos);
    // Object.keys(this.props.athletesPos).length === 0 ? {} :
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Real time</h4>
          {this.props.userCoords ?
            <div>
              <Map lat={this.props.userCoords.lat} lng={this.props.userCoords.lng} athletesObject={this.props.athletesObject} athletes />
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Athletes);
