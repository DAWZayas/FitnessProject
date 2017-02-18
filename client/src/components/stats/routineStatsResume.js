import React from 'react';
import {Link} from 'react-router';
import DonutChart from './donutChart';
import RadarChart from './radarChart';

const toSeconds = ({seconds, minutes, hours}) =>
  Number(seconds) + (Number(minutes) * 60) + (Number(hours) * 3600);

const RoutineStatsResume = ({period, periodStats}) => {

  return (
    <div className="card" style={{overflow: 'hidden'}}>
      <div className="card-header light-grey-gradient white-text">
        {period} stats
      </div>
      <div className="card-block text-xs-center light-gradient">
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Routines</h4>
          <hr />
          {periodStats.numberRoutines}
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Time</h4>
          <hr />
          {periodStats.time.hours + ' h, ' +
          periodStats.time.minutes + ' m, ' +
          periodStats.time.seconds + ' s'}
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">
            {periodStats.objective === 0 ? 'No objectives' :
            periodStats.objectiveVariance.surplus ? 'Surplus' : 'Remaining'}
          </h4>
          <hr />
          {periodStats.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
            periodStats.objectiveVariance.hours + ' h, ' +
            periodStats.objectiveVariance.minutes + ' m, ' +
            periodStats.objectiveVariance.seconds + ' s'}
        </div>
        <div className="card-text col-xs-6">
          <DonutChart
            key={'donutR-Key-' + period}
            canvasId={'donutR-' + period}
            data0={periodStats.objectiveDone !== 0 ? Math.round(periodStats.objectiveDone) + '%' : 'N/A'}
            data1={{n: toSeconds(periodStats.time), color: periodStats.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
            data2={{
              n: periodStats.objectiveDone < 100 && periodStats.objective !== 0 ?
                toSeconds(periodStats.objectiveVariance) : 0,
              color: '#F36666'}}
          />
        </div>
        <div className="card-text col-xs-12">
          <hr />
          <h4 className="card-title">Total exercises <span className="tag badge grey">{periodStats.numberExercises}</span></h4>
          <hr />
        </div>
        <div className="card-text col-xs-12">
          <RadarChart
            key={'radar-key-' + period}
            canvasId={'radar-' + period}
            data={periodStats.exercises}
          />
        </div>
      </div>
    </div>
  );
};

export default RoutineStatsResume;
