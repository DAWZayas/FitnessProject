import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import InfiniteScroll from 'redux-infinite-scroll';

import {getAllRoutines, finishRoutine} from '../../store/actions';
import {CountDown, SearchBar} from '../../components/routine';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';

import modal from './modal.css';

const mapDispatchToProps = dispatch => ({
  fetchRoutines: payload => dispatch(getAllRoutines(payload)),
  saveFinishRoutine: payload => dispatch(finishRoutine(payload)),
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
    console.log(e.target.value);
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
      <div className="container">
        <div className="card text-xs-center">
          <h1>Routines</h1>
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
              {routines.map(routine =>
                <div key={routine.id + Math.random()}>
                {console.log(routine)}
                  <div className="card col-xs-6">
                    <div className="view overlay hm-white-slight">
                      <img src={routine.image} className="img-fluid" alt="" />
                      <a className="mask" href={`#${routine.id}`} />
                    </div>
                    <div className="card-block">
                      <h4 className="card-title">{routine.name}</h4>
                      <hr />
                      <p className="card-text">{routine.description}</p>
                    </div>
                  </div>
                  <div id={routine.id} className={modal.overlay}>
                    <a className={modal.cancel} href="#a"></a>
                    <div className={modal.popup}>
                      <h2>{routine.name}</h2>
                      <a className={modal.close} href="#a">&times;</a>
                      <div className={modal.content}>
                        <hr />
                        <ul className="list-group">
                          <li className="list-group-item">Created by: {routine.user}</li>
                          <li className="list-group-item">Level: {routine.level}</li>
                          <li className="list-group-item">Rounds: {routine.rounds}</li>
                          <li className="list-group-item">Rest: {routine.rest} s.</li>
                          <li className="list-group-item">Round rest: {routine.restRounds} s.</li>
                          <li className="list-group-item list-group-item-info">Exercises: {routine.exercises.length}</li>
                          {routine.exercises.map((ex, key) =>
                            (<li className="list-group-item" key={key}>{ex.name}: {ex.time} s.</li>))}
                        </ul>
                        <button type="submit" className="btn btn-default" onClick={this.handleClick} value={routine.id} >Do it!</button>
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </InfiniteScroll>
            </div>
          : ''
        }

          {this.state.state !== 0 ?
            <div className="card card-block z-depth-1">
              <h4>Round: {this.state.round}</h4>
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
            <div className="card">
              <div className="card-block">
                <h1 className="">{this.state.routine.exercises[this.state.exercise].name}</h1>
                <img src={this.state.routine.exercises[this.state.exercise].image} className="img-fluid" alt="" />
                <div className="z-depth-1">
                <CountDown time={this.state.routine.exercises[this.state.exercise].time} action={this.nextAction} data="rest" />
                </div>
              </div>
            </div>
            : ''
          }
          {this.state.state === 3 ?
            <div>
              <h4>Exercise rest</h4>
              <CountDown time={this.state.routine.rest} action={this.nextAction} data="go" />
            </div>
            : ''
          }
          {this.state.state === 4 ?
            <div>
              <h4>Round rest</h4>
              <CountDown
                time={this.state.routine.restRounds}
                action={this.nextAction}
                data={this.state.round === 'FINAL' ? 'stop' : 'go'}
              />
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
