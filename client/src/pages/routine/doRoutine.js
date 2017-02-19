import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {getAllRoutines, finishRoutine, clearRoutines} from '../../store/actions';
import {CountDown, SearchBar, Routine} from '../../components/routine';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';

const mapDispatchToProps = dispatch => ({
  fetchRoutines: payload => dispatch(getAllRoutines(payload)),
  saveFinishRoutine: payload => dispatch(finishRoutine(payload)),
  doClearRoutines: () => dispatch(clearRoutines()),
});

const mapStateToProps = state => ({
  routines: state.routine.routines,
  hasMore: state.routine.hasMoreRoutines,
  loadingMore: state.routine.routineStatus === 'loading',
  user: state.auth.user.login,
});

class DoRoutine extends Component {

  constructor(props) {
    super(props);
    this.state = {
      state: 0,
      filterText: '',
      showMine: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextAction = this.nextAction.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.showMineOrAll = this.showMineOrAll.bind(this);
  }

  componentDidUpdate() {
    if (this.state.state === 5) {
      this.props.saveFinishRoutine({
        user: this.props.user,
        sport: 'Routine',
        exercises: JSON.stringify(this.state.routine.exercises),
        finishDate: new Date(),
        rounds: this.state.routine.rounds,
      });
    }
  }

  componentWillUnmount() {
    this.props.doClearRoutines();
  }

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
  };

  onLoadMore = () => this.props.fetchRoutines({
    skip: this.props.routines.length,
    limit: 6,
  });

  handleUserInput(filterText) {
    this.setState({
      filterText,
    });
  }

  showMineOrAll = (e) => {
    e.preventDefault();
    this.setState({
      showMine: !this.state.showMine,
    });
  }

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
    let routines = this.props.routines.filter(r => r.name.indexOf(this.state.filterText) !== -1);
    if (this.state.showMine) {
      routines = routines.filter(r => r.user === this.props.user);
    }
    return (
      <div className="card-block z-depth-1 grey lighten-5">
        <div className="card text-xs-center">
          <h2 className="card-block text-xs-center">{(this.state.routine && this.state.routine.name) || 'Exercise routines'}</h2>
        </div>
        <div className="text-xs-center">
        {this.state.state === 0 ?
          !this.props.hasMore && this.props.routines.length === 0 ?
            <div>No Routines yet!</div> :
            <div>
            <nav className="navbar navbar-default card">
              <div className="container-fluid">
                <button type="submit" className="btn btn-sm btn-default" onClick={this.showMineOrAll}>{this.state.showMine ? 'All' : 'Mine'}</button>
                <form className="navbar-form navbar-right col-xs-6">
                  <SearchBar onUserInput={this.handleUserInput} />
                </form>
              </div>
            </nav>
            <InfiniteScroll
              elementIsScrollable={false}
              loadMore={this.onLoadMore}
              hasMore={this.props.hasMore}
              loadingMore={this.props.loadingMore}
              loader={<Loader />}
            >
              {routines.map((routine, key) =>
                <Routine
                  key={key + '-showExercises'}
                  routine={routine}
                  handleClick={this.handleClick}
                />)
              }
            </InfiniteScroll>
            </div>
          : ''
        }

          {this.state.state !== 0 ?
            <div className="card card-block z-depth-1">
              <h2>Round: <b>{this.state.round}</b></h2>
            </div>
            : ''
          }
          {this.state.state === 1 ?
            <div>
              <h4>Starts in...</h4>
              <CountDown time="3" action={this.nextAction} data="go" />
            </div>
            : ''
          }
          {this.state.state === 2 ?
            <div>
              <div className="card-block">
                <h1 className="">{this.state.routine.exercises[this.state.exercise].name}</h1>
                <img src={this.state.routine.exercises[this.state.exercise].image} className="img-fluid" alt="" />
                <div className="z-depth-1 white">
                <CountDown time={this.state.routine.exercises[this.state.exercise].time} action={this.nextAction} data="rest" />
                </div>
              </div>
              <Link to="/routine" className="btn btn-danger">Back</Link>
            </div>
            : ''
          }
          {this.state.state === 3 ?
            <div>
              <div className="card-block">
                <h1>Exercise rest</h1>
                <img src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/exercises/rest.png`} className="img-fluid" alt="" />
                <div className="z-depth-1">
                  <CountDown time={this.state.routine.rest} action={this.nextAction} data="go" />
                </div>
              </div>
              <Link to="/routine" className="btn btn-danger">Back</Link>
            </div>
            : ''
          }
          {this.state.state === 4 ?
            <div>
              <div className="card-block">
                <h1>Round rest</h1>
                <img src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/exercises/rest.png`} className="img-fluid" alt="" />
                <div className="z-depth-1">
                  <CountDown
                    time={this.state.routine.restRounds}
                    action={this.nextAction}
                    data={this.state.round === 'FINAL' ? 'stop' : 'go'}
                  />
                </div>
              </div>
              <Link to="/routine" className="btn btn-danger">Back</Link>
            </div>
            : ''
          }
          {this.state.state === 5 ?
            <div>
              <div className="card-block animated zoomIn">
                <img src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/medal.png`} className="img-fluid" alt="" />
                <h2>Congratulations, you finished the workout!!</h2>
                <Link to="/routine" className="btn btn-default">Back</Link>
              </div>
            </div>
            : ''
          }
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoRoutine);
