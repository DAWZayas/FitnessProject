import React from 'react';

import modal from '../../pages/routine/modal.css';
import styles from '../../pages/routine/radio.css';

const timeArray = [10, 30, 45, 60, 90];

const Exercise = ({exercise, resetExerciseTime, setExerciseTime, handleAddExercise}) => {

  return (
    <div className="card col-xs-6">
      <div className="view overlay hm-white-slight">
        <img src={exercise.image} className="img-fluid" alt="" />
        <a className="mask" href={`#ex${exercise.id}`} />
      </div>
      <div className="card-text">
        <h4 className="card-title text-xs-center">{exercise.name}</h4>
        <hr />
      </div>
      <div id={`ex${exercise.id}`} className={modal.overlay}>
        <a className={modal.cancel} href="#a" onClick={resetExerciseTime}></a>
        <div className={modal.popup}>
          <h2>{exercise.name}</h2>
          <a className={modal.close} href="#a" onClick={resetExerciseTime}>&times;</a>
          <div className={modal.content}>
            <hr />
            <h4 className="card-text">Kind: {exercise.kind}</h4>
            <h4 className="card-text">Calories: {exercise.calories} kcal/h</h4>
            <h4 className="card-text">Description: {exercise.description}</h4>
            <hr />
            <div className="form-inline">
              <div className="">
                <h5>Exercise time in seconds (30 by default)</h5>
                <div id="exerciseTime" onChange={setExerciseTime}>
                  {timeArray.map(time => (
                    <label key={'t1-' + time} className={styles.radio} htmlFor={time + `-${exercise.id}`}>
                      <input type="radio" name="time4" value={time} id={time + `-${exercise.id}`} />
                      <span className={styles.outer}><span className={styles.inner} /></span>
                      {time}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            <div className="text-xs-center">
              <a id={exercise.id} href="#a" className="btn btn-default" onClick={handleAddExercise}>Add</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
