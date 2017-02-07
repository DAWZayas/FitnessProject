import {asyncRequest} from '../util';
import {User, SportSession} from '../db';

const startEndDaysWeek = (curr) => {
  // const curr = new Date();  // change to a parameter date **************
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

const startEndDaysMonth = (curr) => {
  // const curr = new Date();  // change to a parameter date **************
  // console.log(curr);
  const firstday = new Date(curr.setDate(1));
  // console.log(firstday);
  firstday.setUTCHours(0);
  firstday.setUTCMinutes(0);
  firstday.setUTCSeconds(0);
  firstday.setUTCMilliseconds(0);
  const monthDays = (new Date(curr.getFullYear(), curr.getMonth() + 1, 0)).getDate();
  const lastday = new Date(curr.getFullYear(), curr.getMonth(), monthDays, 23, 59, 59, 999);
  return [firstday, lastday];
};

const startEndDaysYear = (curr) => {
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
          weekTimeRunning: 0,
        },
        month: {
          monthSessionsRunningNumber: 0,
          monthDistanceRunning: 0,
          monthVelocityRunning: 0,
          monthTimeRunning: 0,
        },
        year: {
          yearSessionsRunningNumber: 0,
          yearDistanceRunning: 0,
          yearVelocityRunning: 0,
          yearTimeRunning: 0,
        },
      };
      const actualDate = new Date(req.body.actualDate);
      const sport = req.body.type;

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
          statsData.year.yearDistanceRunning = yearSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
          statsData.year.yearVelocityRunning = yearSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.year.yearSessionsRunningNumber;
          statsData.year.yearTimeRunning = yearSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            }));
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
          statsData.month.monthDistanceRunning = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
          statsData.month.monthVelocityRunning = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.month.monthSessionsRunningNumber;
          statsData.month.monthTimeRunning = monthSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            }));
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
          statsData.week.weekDistanceRunning = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance}));
          statsData.week.weekVelocityRunning = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.week.weekSessionsRunningNumber;
          statsData.week.weekTimeRunning = weekSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            }));
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
