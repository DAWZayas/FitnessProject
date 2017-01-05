import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getAllRoutines} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  fetchRoutines: () => dispatch(getAllRoutines()),
});

const mapStateToProps = state => ({
  routines: state.routine.routines,
});

class DoRoutine extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {

  }

  componentWillMount() {
    this.props.fetchRoutines();
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          {this.props.routines.map(e =>
            <button className="btn col-xs-5">
              {e.name}
            </button>)}
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoRoutine);
