import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addObservable, removeObservable} from '../../store/actions';
import {registerSessionsObservable} from '../../store/realtime';

const mapStateToProps = state => ({

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
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Real time</h4>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Athletes);
