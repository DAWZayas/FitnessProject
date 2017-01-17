import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addObservable, removeObservable} from '../../store/actions';
import {registerSessionsObservable} from '../../store/realtime';

import {Map} from '../../components/session';

const mapStateToProps = state => ({
  session: state.session.position,
  athletesPos: state.realtime.pos,
});

const mapDispatchToProps = dispatch => ({
  addObservable: observable => dispatch(addObservable(observable)),
  removeObservable: observable => dispatch(removeObservable(observable)),
});

class Athletes extends Component {

  constructor(props) {
    super(props);
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
    // console.log(this.props.marker);
    // console.log(this.props.athletesPos);
    const pos = Object.keys(this.props.athletesPos).length === 0 ? {} : {lat: this.props.athletesPos.lat, lng: this.props.athletesPos.lng};
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Real time</h4>
          <Map lat={40.479111499999995} lng={-3.8553606000000005} pos={pos} athletes />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Athletes);
