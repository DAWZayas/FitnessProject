import {
  asyncRequest,
  startEndDaysWeek, startEndDaysMonth,
  startEndDaysYear, isDateBetween,
  transformTimeDuration,
} from '../util';
import {User, SportSession} from '../db';

export default (app) => {
  app.post('/api/stats/', asyncRequest(async (req, res) => {
    try {
      const user = await User.get(req.body.userId)
        .without(['password'])
        .execute();

      const statsData = {
        week: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
        month: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
        year: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
      };
      const actualDate = new Date(req.body.actualDate);
      const sport = req.body.type;
      const objectives = user.objectives || {};

      if (sport === 'Running' && objectives.weekRunningKm && objectives.weekRunningKm !== '') {
        statsData.week.objective = Number(objectives.weekRunningKm) * 1000;
        statsData.month.objective = Number(objectives.weekRunningKm) * 4330;
        statsData.year.objective = Number(objectives.weekRunningKm) * 52000;
      }
      if (sport === 'Cycling' && objectives.weekCyclingKm && objectives.weekCyclingKm !== '') {
        statsData.week.objective = Number(objectives.weekCyclingKm) * 1000;
        statsData.month.objective = Number(objectives.weekCyclingKm) * 4330;
        statsData.year.objective = Number(objectives.weekCyclingKm) * 52000;
      }
      if (sport === 'Walking' && objectives.weekWalkingKm && objectives.weekWalkingKm !== '') {
        statsData.week.objective = Number(objectives.weekWalkingKm) * 1000;
        statsData.month.objective = Number(objectives.weekWalkingKm) * 4330;
        statsData.year.objective = Number(objectives.weekWalkingKm) * 52000;
      }

      const sessions = await SportSession.filter({user: user.login});
      if (sessions.length <= 0) {
        res.send(statsData);
        return;
      }

      const validSessions = sessions.filter(s => Object.getOwnPropertyNames(s.duration).length > 0);
      if (validSessions.length <= 0) {
        res.send(statsData);
        return;
      }

      const startEndYear = startEndDaysYear(actualDate);
      const yearSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndYear[0], startEndYear[1]));
      if (yearSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const yearSessionsRunning = yearSessions.filter(s => s.sport === sport);
        if (yearSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.year.numberSessions = yearSessionsRunning.length;
          statsData.year.distanceDone = yearSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.year.velocity = yearSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.year.numberSessions;
          statsData.year.time = yearSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.year.time = transformTimeDuration(statsData.year.time);
          if (statsData.year.objective !== 0) {
            statsData.year.objectiveDone = statsData.year.distanceDone / statsData.year.objective * 100;
          }
        }
      }
      const startEndMonth = startEndDaysMonth(actualDate);
      const monthSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndMonth[0], startEndMonth[1]));
      if (monthSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const monthSessionsRunning = monthSessions.filter(s => s.sport === sport);
        if (monthSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.month.numberSessions = monthSessionsRunning.length;
          statsData.month.distanceDone = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.month.velocity = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.month.numberSessions;
          statsData.month.time = monthSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.month.time = transformTimeDuration(statsData.month.time);
          if (statsData.month.objective !== 0) {
            statsData.month.objectiveDone = statsData.month.distanceDone / statsData.month.objective * 100;
          }
        }
      }

      const startEndWeek = startEndDaysWeek(actualDate);
      const weekSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndWeek[0], startEndWeek[1]));
      if (weekSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const weekSessionsRunning = weekSessions.filter(s => s.sport === sport);
        if (weekSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.week.numberSessions = weekSessionsRunning.length;
          statsData.week.distanceDone = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.week.velocity = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.week.numberSessions;
          statsData.week.time = weekSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
            statsData.week.time = transformTimeDuration(statsData.week.time);
          if (statsData.week.objective !== 0) {
            statsData.week.objectiveDone = statsData.week.distanceDone / statsData.week.objective * 100;
          }
        }
      }
      res.send(statsData);
      // const weekSessionsRunning = weekSessions.filter(s => s.sport === sport);
      // const numberSessions = weekSessionsRunning.length;
      // const distanceDone = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
      // const velocity = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / numberSessions;
      // const time = weekSessionsRunning.reduce(
      //   (a, b) => ({
      //     duration: {
      //       hours: a.duration.hours + b.duration.hours,
      //       minutes: a.duration.minutes + b.duration.minutes,
      //       seconds: a.duration.seconds + b.duration.seconds,
      //     },
      //   }));
      //
      // const monthSessionsRunning = monthSessions.filter(s => s.sport === sport);
      // const numberSessions = monthSessionsRunning.length;
      // const distanceDone = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
      // const velocity = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / numberSessions;
      // const time = monthSessionsRunning.reduce(
      //   (a, b) => ({
      //     duration: {
      //       hours: a.duration.hours + b.duration.hours,
      //       minutes: a.duration.minutes + b.duration.minutes,
      //       seconds: a.duration.seconds + b.duration.seconds,
      //     },
      //   }));


      // console.log('--------------------------');
      // console.log('week sessions: ' + numberSessions);
      // console.log('distance: ' + distanceDone.distance);
      // console.log('velocity: ' + velocity);
      // console.log('week time: ' + time.duration.hours + ' ' + time.duration.minutes + ' ' + time.duration.seconds);
      // console.log('--------------------------');
      // console.log('month sessions: ' + numberSessions);
      // console.log('distance: ' + distanceDone.distance);
      // console.log('velocity: ' + velocity);
      // console.log('month time: ' + time.duration.hours + ' ' + time.duration.minutes + ' ' + time.duration.seconds);
      // console.log('--------------------------');
      // console.log('year sessions: ' + numberSessions);
      // console.log('distance: ' + distanceDone.distance);
      // console.log('velocity: ' + velocity);
      // console.log('year time: ' + time.duration.hours + ' ' + time.duration.minutes + ' ' + time.duration.seconds);
      // console.log('--------------------------');
    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));
};
