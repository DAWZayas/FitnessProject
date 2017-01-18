import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addObservable, removeObservable, prepareSession} from '../../store/actions';
import {registerSessionsObservable} from '../../store/realtime';

import {Map} from '../../components/session';

const mapStateToProps = state => ({
  userCoords: state.session.position,
  athletesPos: state.realtime.pos,
});

const mapDispatchToProps = dispatch => ({
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: observable => dispatch(removeObservable(observable)),
  updateUserCoords: () => dispatch(prepareSession()),
});

class Athletes extends Component {

  constructor(props) {
    super(props);
    this.props.updateUserCoords();
    const {addObservable} = this.props;
    const {payload: observable} = addObservable(registerSessionsObservable());
    this.state = {
      observable,
    };
  }

  componentWillUnmount() {
    const {observable} = this.state;
    this.props.removeObservable(observable);
  }

  render() {
    // console.log(this.props.userCoords);
    // console.log(this.props.marker);
    // console.log(this.props.athletesPos);
    // Object.keys(this.props.athletesPos).length === 0 ? {} :
    const pos = {lat: this.props.athletesPos.lat, lng: this.props.athletesPos.lng};
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Real time</h4>
          {this.props.userCoords ?
            <div>
              <Map lat={this.props.userCoords.lat} lng={this.props.userCoords.lng} pos={pos} athletes />
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Athletes);
