import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createRoutine, getExercises, getImages} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';
import {Exercise} from '../../components/routine';

import styles from './radio.css';
import modal from './modal.css';

const mapStateToProps = state => ({
  userName: state.auth.user.login,
  exercises: state.routine.exercises,
  status: state.routine.exerciseStatus,
  statusImages: state.images.state,
  images: state.images.routines,
});

const mapDispatchToProps = dispatch => ({
  onCreateRoutineClick: payload => dispatch(createRoutine(payload)),
  loadExercises: () => dispatch(getExercises()),
  onSelectImages: params => dispatch(getImages(params)),
});

let image;

class Create extends Component {


  constructor(props) {
    super(props);
    this.state = {
      routineExercises: [],
      exerciseTime: 30,
      showExercises: false,
      levelArray: [1, 2, 3, 4, 5],
      restArray: [5, 10, 15, 20, 25],
      roundsArray: [1, 2, 3, 4, 5],
      restRoundsArray: [10, 30, 60, 90, 120],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickExercise = this.handleClickExercise.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setRest = this.setRest.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.setRestRounds = this.setRestRounds.bind(this);
    this.setName = this.setName.bind(this);
    this.setExerciseTime = this.setExerciseTime.bind(this);
    this.resetExerciseTime = this.resetExerciseTime.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();

    this.props.onCreateRoutineClick({
      user: this.props.userName,
      name: this.state.name,
      level: this.state.level,
      rest: this.state.rest,
      rounds: this.state.rounds,
      restRounds: this.state.restRounds,
      exercises: JSON.stringify(this.state.routineExercises),
      image: '' + image,
    });
    image = '';
  };

  handleClickExercise = (e) => {
    e.preventDefault();
    this.setState({showExercises: !this.state.showExercises});
    this.props.loadExercises();
  };

  handleRemoveExercise = (e) => {
    e.preventDefault();
    let index = Number(e.target.id[0]);
    let firstRoutine = this.state.routineExercises.slice(0, index);
    this.setState({
      routineExercises: this.state.routineExercises.slice(0, index).concat(this.state.routineExercises.slice(index + 1)),
    });
  };

  handleAddExercise = (e) => {
    // e.preventDefault();
    this.setState({
      routineExercises: [...this.state.routineExercises,
        {id: e.target.id,
          image: this.props.exercises.filter(token => e.target.id === token.id)[0].image,
          time: this.state.exerciseTime,
          name: this.props.exercises.filter(token => e.target.id === token.id)[0].name,
          kind: this.props.exercises.filter(token => e.target.id === token.id)[0].kind,
        }],
      exerciseTime: 30,
    });
  };

  setName = (e) => {
    this.setState({name: e.target.value});
  };

  setLevel = (e) => {
    this.setState({level: e.target.value});
  };

  setRest = (e) => {
    this.setState({rest: e.target.value});
  };

  setRounds = (e) => {
    this.setState({rounds: e.target.value});
  };

  setRestRounds = (e) => {
    this.setState({restRounds: e.target.value});
  };

  setExerciseTime = (e) => {
    console.log(e.target.value)
    this.setState({exerciseTime: e.target.value});
  };

  resetExerciseTime = () => {
    this.setState({exerciseTime: 30});
  };

  handleImages = () => {
    this.props.onSelectImages({folder: 'routines'});
  };

  selectImage = (e) => {
    image = e.target.src;
  };

  render() {
    return (
      <div className="jumbotron animated fadeIn">
      <div className="card-block z-depth-1 grey lighten-5">
        <h2>Create routine</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Routine name"
              onChange={this.setName}
            />
          </div>
          <div className="card-block">
            <a className="btn btn-info btn-sm" href="#images" onClick={this.handleImages}>Select image</a>
            {image ? <img src={image} width="50px" height="50px" alt="" /> : ''}
          </div>
          <div id="images" className={modal.overlay}>
            <div className={modal.popup}>
              <h2>Images</h2>
              <a className={modal.close} href="#a">&times;</a>
              <hr />
              <div className={modal.content}>
                {this.props.images !== undefined ? this.props.images.map(img =>
                  <a href="#a" key={img + '-exercise'}>
                    <img src={`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/static/images/routines/` + img} onClick={this.selectImage} className="col-xs-6 col-md-4 col-lg-3" alt="" />
                  </a>
                ) : <div className="text-xs-center"><Loader /></div>}
                <hr />
              </div>
            </div>
            <hr />
          </div>
          <hr />
          <div className="form-inline">
            <div className="">
              <h5>Level</h5>
              <div id="inputLevel" onChange={this.setLevel}>
                {this.state.levelArray.map(lv => (
                  <label key={'g1-' + lv} className={styles.radio} htmlFor={'g1' + lv}>
                    <input type="radio" name="group1" value={lv} id={'g1' + lv} />
                    <span className={styles.outer}><span className={styles.inner} /></span>
                    {lv}
                  </label>
                ))}
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rest</h5>
              <div id="inputRest" onChange={this.setRest}>
                {this.state.restArray.map(rest => (
                  <label key={'g2-' + rest} className={styles.radio} htmlFor={'g2' + rest}>
                    <input type="radio" name="group2" value={rest} id={'g2' + rest} />
                    <span className={styles.outer}><span className={styles.inner} /></span>
                    {rest}
                  </label>
                ))}
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rounds</h5>
              <div id="inputRounds" onChange={this.setRounds}>
                {this.state.roundsArray.map(round => (
                  <label key={'g3-' + round} className={styles.radio} htmlFor={'g3' + round}>
                    <input type="radio" name="group3" value={round} id={'g3' + round} />
                    <span className={styles.outer}><span className={styles.inner} /></span>
                    {round}
                  </label>
                ))}
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rounds Rest</h5>
              <div id="inputRestRounds" onChange={this.setRestRounds}>
                {this.state.restRoundsArray.map(restRound => (
                  <label key={'g4-' + restRound} className={styles.radio} htmlFor={'g4' + restRound}>
                    <input type="radio" name="group4" value={restRound} id={'g4' + restRound} />
                    <span className={styles.outer}><span className={styles.inner} /></span>
                    {restRound}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            {this.state.routineExercises.length <= 0 ? <h4 className="card-block text-xs-center">No exercises added yet</h4> :
            this.state.routineExercises.map((e, key) =>
              <div className="row card-block" key={key + '-routineExercises'}>
                <img className="img-fluid col-xs-4" src={e.image} alt="" />
                <div className="card-block col-xs-6">
                  <h4 className="card-text">{e.name}</h4>
                  <h4 className="card-text">{e.time}''</h4>
                </div>
                <i id={key + 'R-ex'} className="fa fa-close fa-2x grey-text" onClick={this.handleRemoveExercise} aria-hidden="true" style={{cursor: 'pointer'}} />
              </div>
            )}
          </div>
          <hr />
          <div className="text-xs-center">
            <button type="submit" className="btn btn-primary" onClick={this.handleClickExercise}>{this.state.showExercises ? 'Hide exercises' : 'Show exercises'}</button>
          </div>
          <div className="row">
            {this.state.showExercises ?
              this.props.status === 'loading' ? <div className="text-xs-center"><Loader /></div> :
                this.props.exercises.map((ex, key) =>
                  <Exercise
                    key={key + '-showExercises'}
                    exercise={ex}
                    resetExerciseTime={this.resetExerciseTime}
                    setExerciseTime={this.setExerciseTime}
                    handleAddExercise={this.handleAddExercise}
                  />
                )
                : ''}
          </div>
        </form>
        </div>
        <div className="card-block text-xs-center">
          <button type="submit" className="btn btn-default" onClick={this.handleClick}>Create</button>
          <Link to="/routine" className="btn btn-danger">Back</Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
