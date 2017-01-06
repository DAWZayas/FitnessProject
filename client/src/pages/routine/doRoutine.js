import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {getAllRoutines} from '../../store/actions';
import {CountDown} from '../../components/routine';

const mapDispatchToProps = dispatch => ({
  fetchRoutines: () => dispatch(getAllRoutines()),
});

const mapStateToProps = state => ({
  routines: state.routine.routines,
});

class DoRoutine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      state: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextAction = this.nextAction.bind(this);
  }

  componentDidUpdate() {

  }

  componentWillMount() {
    this.props.fetchRoutines();
  }

  // componentDidMount() {
  //   if (this.state.round === this.state.routine.rounds) {
  //     this.setState({round: 'FINAL'});
  //   }
  // }

  handleClick = (e) => {
    e.preventDefault();
    this.setState(
      {
        state: 1,
        routine: this.props.routines.filter(r => e.target.value === r.id)[0],
        round: this.props.routines.filter(r => e.target.value === r.id)[0].rounds === 1 ? 'FINAL' : 1,
        exercise: 0,
      }
    );
    console.log(e.target.value);
  };

  nextAction = () => {
    if (this.state.state === 1) {
      this.setState({state: 2});
    }
    if (this.state.state === 3) {
      this.setState({state: 2});
    }
    if (this.state.state === 2) {
      let index = this.state.exercise;
      if (index + 1 >= this.state.routine.exercises.length) {
        index = 0;
        this.setState({state: 4, exercise: index});
      } else {
        index++;
        this.setState({state: 3, exercise: index});
      }
    }
    if (this.state.state === 4) {
      if (this.state.round === this.state.routine.rounds - 1) {
        this.setState({state: 2, round: 'FINAL'});
      } else if (this.state.round === 'FINAL') {
        this.setState({state: 5});
      } else {
        this.setState({state: 2, round: ++this.state.round});
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          {this.state.state === 0 ?
            this.props.routines.map(e =>
              <button className="btn col-xs-5" onClick={this.handleClick} value={e.id}>
                {e.name}
              </button>)
            : ''
          }
          {this.state.state !== 0 ?
            <h4>Round: {this.state.round}</h4>
            : ''
          }
          {this.state.state === 1 ?
            <div>
              <h4>Starts in...</h4>
              <CountDown time="3" action={this.nextAction} data={{}} />
            </div>
            : ''
          }
          {this.state.state === 2 ?
            <div className="card">
              <div className="card-block">
                <h4 className="card-title">{this.state.routine.exercises[this.state.exercise].name}</h4>
                <CountDown time={this.state.routine.exercises[this.state.exercise].time} action={this.nextAction} data={{}} />
              </div>
            </div>
            : ''
          }
          {this.state.state === 3 ?
            <div>
              <h4>Exercise rest</h4>
              <CountDown time={this.state.routine.rest} action={this.nextAction} data={{}} />
            </div>
            : ''
          }
          {this.state.state === 4 ?
            <div>
              <h4>Round rest</h4>
              <CountDown time={this.state.routine.restRounds} action={this.nextAction} data={{}} />
            </div>
            : ''
          }
          {this.state.state === 5 ?
            <div>
              <h4>Congratulations, you finished the workout!!</h4>
              <Link to="/routine" className="btn btn-default">Back</Link>
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoRoutine);
