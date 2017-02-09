import {asyncRequest} from '../util';
import {User, SportSession} from '../db';

const startEndDaysWeek = (date) => {
  const curr = new Date(date.getTime());
  let day = curr.getDay();
  // console.log(day);
  if (day === 0) { day = 7; }
  day--;
  const first = curr.getDate() - day;
  // console.log(first);
  const firstday = new Date(curr.setDate(first));
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const lastday = new Date(curr.setDate(firstday.getDate() + 6));
  lastday.setUTCHours(23);
  lastday.setUTCMinutes(59);
  lastday.setUTCSeconds(59);
  lastday.setUTCMilliseconds(999);
  return [firstday, lastday];
};

const startEndDaysMonth = (date) => {
  const curr = new Date(date.getTime());
  const firstday = new Date(curr.setDate(1));
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const monthDays = (new Date(curr.getFullYear(), curr.getMonth() + 1, 0)).getDate();
  const lastday = new Date(curr.getFullYear(), curr.getMonth(), monthDays, 23, 59, 59, 999);
  return [firstday, lastday];
};

const startEndDaysYear = (date) => {
  const curr = new Date(date.getTime());
  // const curr = new Date();  // change to a parameter date **************
  // console.log(curr);
  const firstday = new Date(curr.setDate(1));
  firstday.setMonth(0);
  // console.log(firstday);
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const lastday = new Date(curr.getFullYear(), 11, 31, 23, 59, 59, 999);
  return [firstday, lastday];
};

const isDateBetween = (date, start, end) =>
  date.valueOf() >= start.valueOf() && date.valueOf() <= end.valueOf();

const transformTimeDuration = ({seconds, minutes, hours}) => {
  const total = seconds + (minutes * 60) + (hours * 3600);
  const newHours = Math.floor(total / 3600);
  let newMinutes = Math.floor((total % 3600) / 60);
  let newSeconds = total % 60;
  newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
  newSeconds = newSeconds < 10 ? '0' + newSeconds : newSeconds;
  return {hours: newHours, minutes: newMinutes, seconds: newSeconds};
};

export default (app) => {
  app.post('/api/stats/', asyncRequest(async (req, res) => {
    try {
      const user = await User.get(req.body.userId)
        .without(['password'])
        .execute();

      const statsData = {
        week: {
          weekSessionsRunningNumber: 0,
          weekDistanceRunning: 0,
          weekVelocityRunning: 0,
          weekTimeRunning: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          weekRunObj: 0,
          weekRunObjDone: 0,
        },
        month: {
          monthSessionsRunningNumber: 0,
          monthDistanceRunning: 0,
          monthVelocityRunning: 0,
          monthTimeRunning: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          monthRunObj: 0,
          monthRunObjDone: 0,
        },
        year: {
          yearSessionsRunningNumber: 0,
          yearDistanceRunning: 0,
          yearVelocityRunning: 0,
          yearTimeRunning: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          yearRunObj: 0,
          yearRunObjDone: 0,
        },
      };
      const actualDate = new Date(req.body.actualDate);
      const sport = req.body.type;
      const objectives = user.objectives;
      if (sport === 'Running' && objectives.weekRunningKm && objectives.weekRunningKm !== '') {
        statsData.week.weekRunObj = Number(objectives.weekRunningKm) * 1000;
        statsData.month.monthRunObj = Number(objectives.weekRunningKm) * 4330;
        statsData.year.yearRunObj = Number(objectives.weekRunningKm) * 52000;
      }
      if (sport === 'Cycling' && objectives.weekCyclingKm && objectives.weekCyclingKm !== '') {
        statsData.week.weekRunObj = Number(objectives.weekCyclingKm) * 1000;
        statsData.month.monthRunObj = Number(objectives.weekCyclingKm) * 4330;
        statsData.year.yearRunObj = Number(objectives.weekCyclingKm) * 52000;
      }
      if (sport === 'Walking' && objectives.weekWalkingKm && objectives.weekWalkingKm !== '') {
        statsData.week.weekRunObj = Number(objectives.weekWalkingKm) * 1000;
        statsData.month.monthRunObj = Number(objectives.weekWalkingKm) * 4330;
        statsData.year.yearRunObj = Number(objectives.weekWalkingKm) * 52000;
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
          statsData.year.yearSessionsRunningNumber = yearSessionsRunning.length;
          statsData.year.yearDistanceRunning = yearSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.year.yearVelocityRunning = yearSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.year.yearSessionsRunningNumber;
          statsData.year.yearTimeRunning = yearSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.year.yearTimeRunning = transformTimeDuration(statsData.year.yearTimeRunning);
          if (statsData.year.yearRunObj !== 0) {
            statsData.year.yearRunObjDone = statsData.year.yearDistanceRunning / statsData.year.yearRunObj * 100;
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
          statsData.month.monthSessionsRunningNumber = monthSessionsRunning.length;
          statsData.month.monthDistanceRunning = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.month.monthVelocityRunning = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.month.monthSessionsRunningNumber;
          statsData.month.monthTimeRunning = monthSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.month.monthTimeRunning = transformTimeDuration(statsData.month.monthTimeRunning);
          if (statsData.month.monthRunObj !== 0) {
            statsData.month.monthRunObjDone = statsData.month.monthDistanceRunning / statsData.month.monthRunObj * 100;
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
          statsData.week.weekSessionsRunningNumber = weekSessionsRunning.length;
          statsData.week.weekDistanceRunning = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.week.weekVelocityRunning = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.week.weekSessionsRunningNumber;
          statsData.week.weekTimeRunning = weekSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
            statsData.week.weekTimeRunning = transformTimeDuration(statsData.week.weekTimeRunning);
          if (statsData.week.weekRunObj !== 0) {
            statsData.week.weekRunObjDone = statsData.week.weekDistanceRunning / statsData.week.weekRunObj * 100;
          }
        }
      }
      res.send(statsData);
      // const weekSessionsRunning = weekSessions.filter(s => s.sport === sport);
      // const weekSessionsRunningNumber = weekSessionsRunning.length;
      // const weekDistanceRunning = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
      // const weekVelocityRunning = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / weekSessionsRunningNumber;
      // const weekTimeRunning = weekSessionsRunning.reduce(
      //   (a, b) => ({
      //     duration: {
      //       hours: a.duration.hours + b.duration.hours,
      //       minutes: a.duration.minutes + b.duration.minutes,
      //       seconds: a.duration.seconds + b.duration.seconds,
      //     },
      //   }));
      //
      // const monthSessionsRunning = monthSessions.filter(s => s.sport === sport);
      // const monthSessionsRunningNumber = monthSessionsRunning.length;
      // const monthDistanceRunning = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
      // const monthVelocityRunning = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / monthSessionsRunningNumber;
      // const monthTimeRunning = monthSessionsRunning.reduce(
      //   (a, b) => ({
      //     duration: {
      //       hours: a.duration.hours + b.duration.hours,
      //       minutes: a.duration.minutes + b.duration.minutes,
      //       seconds: a.duration.seconds + b.duration.seconds,
      //     },
      //   }));


      // console.log('--------------------------');
      // console.log('week sessions: ' + weekSessionsRunningNumber);
      // console.log('distance: ' + weekDistanceRunning.distance);
      // console.log('velocity: ' + weekVelocityRunning);
      // console.log('week time: ' + weekTimeRunning.duration.hours + ' ' + weekTimeRunning.duration.minutes + ' ' + weekTimeRunning.duration.seconds);
      // console.log('--------------------------');
      // console.log('month sessions: ' + monthSessionsRunningNumber);
      // console.log('distance: ' + monthDistanceRunning.distance);
      // console.log('velocity: ' + monthVelocityRunning);
      // console.log('month time: ' + monthTimeRunning.duration.hours + ' ' + monthTimeRunning.duration.minutes + ' ' + monthTimeRunning.duration.seconds);
      // console.log('--------------------------');
      // console.log('year sessions: ' + yearSessionsRunningNumber);
      // console.log('distance: ' + yearDistanceRunning.distance);
      // console.log('velocity: ' + yearVelocityRunning);
      // console.log('year time: ' + yearTimeRunning.duration.hours + ' ' + yearTimeRunning.duration.minutes + ' ' + yearTimeRunning.duration.seconds);
      // console.log('--------------------------');
    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));
};
