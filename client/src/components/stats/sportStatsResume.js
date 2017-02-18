import React from 'react';
import {Link} from 'react-router';
import DonutChart from './donutChart';

const SportStatsResume = ({period, periodStats}) => {

  return (
    <div className="card" style={{overflow: 'hidden'}}>
      <div className="card-header light-grey-gradient white-text">
        {period} stats
      </div>
      <div className="card-block text-xs-center light-gradient">
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Sessions</h4>
          <hr />
          {periodStats.numberSessions}
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Velocity</h4>
          <hr />
          {periodStats.velocity.toFixed(1)} km/h
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Time</h4>
          <hr />
          {periodStats.time.hours + ' h, ' +
          periodStats.time.minutes + ' m, ' +
          periodStats.time.seconds + ' s'}
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">Distance</h4>
          <hr />
          {(periodStats.distanceDone / 1000).toFixed(2)} km
        </div>
        <div className="card card-block col-xs-6">
          <h4 className="card-title">
            {periodStats.objective === 0 ? 'No objectives' :
            periodStats.objective - periodStats.distanceDone < 0 ? 'Surplus' : 'Remaining'}
          </h4>
          <hr />
          {periodStats.objective === 0 ? <Link to="/objectives" className="btn btn-sm btn-info">Add objectives!</Link> :
          (Math.abs(periodStats.objective - periodStats.distanceDone) / 1000).toFixed(2) + ' km'}
        </div>
        <div className="card-text col-xs-6">
          <DonutChart
            key={'donut-key' + period}
            canvasId={'donut-' + period}
            data0={periodStats.objectiveDone !== 0 ? Math.round(periodStats.objectiveDone) + '%' : 'N/A'}
            data1={{n: periodStats.distanceDone, color: periodStats.objective !== 0 ? '#90EE90' : '#9e9e9e'}}
            data2={{
              n: periodStats.objectiveDone < 100 && periodStats.objective !== 0 ?
                periodStats.objective - periodStats.distanceDone : 0,
              color: '#F36666'}}
          />
        </div>
      </div>
    </div>
  );
};

export default SportStatsResume;
