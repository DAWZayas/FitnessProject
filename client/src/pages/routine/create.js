import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createRoutine, getExercises} from '../../store/actions';

import styles from './radio.css';

const mapStateToProps = state => ({
  userName: state.auth.user.login,
  exercises: state.routine.exercises,
});

const mapDispatchToProps = dispatch => ({
  onCreateRoutineClick: payload => dispatch(createRoutine(payload)),
  loadExercises: () => dispatch(getExercises()),
});

class Create extends Component {


  constructor(props) {
    super(props);
    this.state = {
      routineExercises: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickExercise = this.handleClickExercise.bind(this);
    this.handleAddExercise = this.handleAddExercise.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setRest = this.setRest.bind(this);
    this.setRounds = this.setRounds.bind(this);
    this.setRestRounds = this.setRestRounds.bind(this);
    this.setName = this.setName.bind(this);
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
    });
  };

  handleClickExercise = (e) => {
    e.preventDefault();
    this.props.loadExercises();
  };

  handleAddExercise = (e) => {
    e.preventDefault();
    this.setState({
      routineExercises: [...this.state.routineExercises,
        {id: e.target.id,
          image: this.props.exercises.filter(token => e.target.id === token.id)[0].image,
          time: 20,
          name: this.props.exercises.filter(token => e.target.id === token.id)[0].name,
        }],
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

  render() {
    return (
      <div className="jumbotron animated fadeIn">
        <h2>Create routine</h2>
        <form>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              placeholder="routine name"
              onChange={this.setName}
            />
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="inputLevel">Level</label>
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
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="inputRest">Rest</label>
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
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="inputRounds">Rounds</label>
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
          </div>
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="inputRestRounds">Rounds Rest</label>
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
          <div>
            {this.state.routineExercises.map(e =>
              <div className="card row">
                <img className="img-fluid col-xs-6"src={e.image} alt="" />
                <span className="col-xs-6">ex: {e.name}, time: {e.time}</span>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.handleClickExercise}>Show exercises</button>
          <div className="form-group row">

            {this.props.exercises.map(ex =>
              <div className="card col-xs-6">
                <div className="view overlay hm-white-slight">
                  <img src={ex.image} className="img-fluid" alt="" />
                  <a className="mask" id={ex.id} href={`#${ex.id}`} onClick={this.handleAddExercise} />
                </div>
                <div className="card-block">
                  <h4 className="card-title">{ex.name}</h4>
                  <hr />
                  <p className="card-text">{ex.kind}</p>
                  <p className="card-text">{ex.calories}</p>
                  <p className="card-text">{ex.description}</p>
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-default" onClick={this.handleClick}>Create</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
