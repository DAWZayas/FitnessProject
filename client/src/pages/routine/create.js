import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {createRoutine, getExercises, getImages} from '../../store/actions';
import {server as serverConfig} from '../../../config';

import Loader from '../../components/loader';

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
    console.log(e.target.id);
    console.log(this.state.exerciseTime);
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
    console.log(this.state.routineExercises.map(ex => JSON.stringify(ex)));
  };

  setName = (e) => {
    console.log(e.target.value);
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
                  <a href="#a">
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
                <label className={styles.radio} htmlFor="g11"><input type="radio" name="group1" value="1" id="g11" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  1
                </label>
                <label className={styles.radio} htmlFor="g12"><input type="radio" name="group1" value="2" id="g12" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  2
                </label>
                <label className={styles.radio} htmlFor="g13"><input type="radio" name="group1" value="3" id="g13" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  3
                </label>
                <label className={styles.radio} htmlFor="g14"><input type="radio" name="group1" value="4" id="g14" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  4
                </label>
                <label className={styles.radio} htmlFor="g15"><input type="radio" name="group1" value="5" id="g15" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  5
                </label>
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rest</h5>
              <div id="inputRest" onChange={this.setRest}>
                <label className={styles.radio} htmlFor="g21"><input type="radio" name="group2" value="5" id="g21" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  5
                </label>
                <label className={styles.radio} htmlFor="g22"><input type="radio" name="group2" value="10" id="g22" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  10
                </label>
                <label className={styles.radio} htmlFor="g23"><input type="radio" name="group2" value="15" id="g23" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  15
                </label>
                <label className={styles.radio} htmlFor="g24"><input type="radio" name="group2" value="20" id="g24" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  20
                </label>
                <label className={styles.radio} htmlFor="g25"><input type="radio" name="group2" value="25" id="g25" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  25
                </label>
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rounds</h5>
              <div id="inputRounds" onChange={this.setRounds}>
                <label className={styles.radio} htmlFor="g31"><input type="radio" name="group3" value="1" id="g31" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  1
                </label>
                <label className={styles.radio} htmlFor="g32"><input type="radio" name="group3" value="2" id="g32" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  2
                </label>
                <label className={styles.radio} htmlFor="g33"><input type="radio" name="group3" value="3" id="g33" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  3
                </label>
                <label className={styles.radio} htmlFor="g34"><input type="radio" name="group3" value="4" id="g34" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  4
                </label>
                <label className={styles.radio} htmlFor="g35"><input type="radio" name="group3" value="5" id="g35" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  5
                </label>
              </div>
            </div>
            <hr />
          </div>
          <div className="form-inline">
            <div className="">
              <h5>Rounds Rest</h5>
              <div id="inputRestRounds" onChange={this.setRestRounds}>
                <label className={styles.radio} htmlFor="g41"><input type="radio" name="group4" value="30" id="g41" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  30
                </label>
                <label className={styles.radio} htmlFor="g42"><input type="radio" name="group4" value="60" id="g42" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  60
                </label>
                <label className={styles.radio} htmlFor="g43"><input type="radio" name="group4" value="90" id="g43" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  90
                </label>
                <label className={styles.radio} htmlFor="g44"><input type="radio" name="group4" value="120" id="g44" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  120
                </label>
                <label className={styles.radio} htmlFor="g45"><input type="radio" name="group4" value="150" id="g45" />
                  <span className={styles.outer}><span className={styles.inner} /></span>
                  150
                </label>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            {this.state.routineExercises.length <= 0 ? <h4 className="card-block text-xs-center">No exercises added yet</h4> :
            this.state.routineExercises.map((e, key) =>
              <div className="row card-block" key={key}>
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
                  <div className="card col-xs-6" key={key}>
                    <div className="view overlay hm-white-slight">
                      <img src={ex.image} className="img-fluid" alt="" />
                      <a className="mask" href={`#ex${ex.id}`} />
                    </div>
                    <div className="card-block">
                      <h4 className="card-title text-xs-center">{ex.name}</h4>
                    </div>
                    <div id={`ex${ex.id}`} className={modal.overlay}>
                      <a className={modal.cancel} href="#a" onClick={this.resetExerciseTime}></a>
                      <div className={modal.popup}>
                        <h2>{ex.name}</h2>
                        <a className={modal.close} href="#a" onClick={this.resetExerciseTime}>&times;</a>
                        <div className={modal.content}>
                          <hr />
                          <h4 className="card-text">Kind: {ex.kind}</h4>
                          <h4 className="card-text">Calories: {ex.calories} kcal/h</h4>
                          <h4 className="card-text">Description: {ex.description}</h4>
                          <hr />
                          <div className="form-inline">
                            <div className="">
                              <h5>Exercise time in seconds (30 by default)</h5>
                              <div id="exerciseTime" onChange={this.setExerciseTime}>
                                <label className={styles.radio} htmlFor={`t1-${ex.id}`}><input type="radio" name="time4" value="30" id={`t1-${ex.id}`} checked={false} />
                                  <span className={styles.outer}><span className={styles.inner} /></span>
                                  30
                                </label>
                                <label className={styles.radio} htmlFor={`t2-${ex.id}`}><input type="radio" name="time4" value="45" id={`t2-${ex.id}`} checked={false} />
                                  <span className={styles.outer}><span className={styles.inner} /></span>
                                  45
                                </label>
                                <label className={styles.radio} htmlFor={`t3-${ex.id}`}><input type="radio" name="time4" value="60" id={`t3-${ex.id}`} checked={false} />
                                  <span className={styles.outer}><span className={styles.inner} /></span>
                                  60
                                </label>
                                <label className={styles.radio} htmlFor={`t4-${ex.id}`}><input type="radio" name="time4" value="90" id={`t4-${ex.id}`} checked={false} />
                                  <span className={styles.outer}><span className={styles.inner} /></span>
                                  90
                                </label>
                                <label className={styles.radio} htmlFor={`t5-${ex.id}`}><input type="radio" name="time4" value="120" id={`t5-${ex.id}`} checked={false} />
                                  <span className={styles.outer}><span className={styles.inner} /></span>
                                  120
                                </label>
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="text-xs-center">
                            <a id={ex.id} href="#a" className="btn btn-default" onClick={this.handleAddExercise}>Add</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
