import React from 'react';

import modal from '../../pages/routine/modal.css';

const Routine = ({routine, handleClick}) => {

  return (
    <div key={routine.id + Math.random()}>
      <div className="card col-xs-6">
        <div className="view overlay hm-white-slight">
          <img src={routine.image} className="img-fluid" alt="" />
          <a className="mask" href={`#${routine.id}`} />
        </div>
        <div className="card-text">
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
              <li className="list-group-item"><h4>Creator: <span className="tag badge grey">{routine.user}</span></h4></li>
              <li className="list-group-item"><h4>Level: <span className="tag badge grey">{routine.level}</span></h4></li>
              <li className="list-group-item"><h4>Rounds: <span className="tag badge grey">{routine.rounds}</span></h4></li>
              <li className="list-group-item"><h4>Rest: <span className="tag badge grey">{routine.rest} s.</span></h4></li>
              <li className="list-group-item"><h4>Round rest: <span className="tag badge grey">{routine.restRounds} s.</span></h4></li>
              <li className="list-group-item blue-grey lighten-4"><h4>Exercises: <span className="tag badge grey">{routine.exercises.length}</span></h4></li>
              {routine.exercises.map((ex, key) =>
                (<li className="list-group-item blue-grey lighten-5" key={key + 'R-ex'}><h4>{ex.name}: <span className="tag badge grey">{ex.time} s.</span></h4></li>))}
            </ul>
            <button type="submit" className="btn btn-default" onClick={handleClick} value={routine.id} >Do it!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routine;
