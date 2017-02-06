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
      const actualDate = new Date(req.body.actualDate);
      const objectives = user.objectives;
      const sessions = await SportSession.filter({user: user.login});
      const validSessions = sessions.filter(s => Object.getOwnPropertyNames(s.duration).length > 0);
      const startEndWeek = startEndDaysWeek(actualDate);
      console.log(startEndWeek);
      console.log(isDateBetween(actualDate, startEndWeek[0], startEndWeek[1]));
      const weekSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndWeek[0], startEndWeek[1]));
      const startEndMonth = startEndDaysMonth(actualDate);
      const monthSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndMonth[0], startEndMonth[1]));
      const startEndYear = startEndDaysYear(actualDate);
      const yearSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndYear[0], startEndYear[1]));

      const weekSessionsRunning = weekSessions.filter(s => s.sport === 'Running');
      const weekSessionsRunningNumber = weekSessionsRunning.length;
      const weekDistanceRunning = weekSessions.reduce((a, b) => ({distance: a.distance + b.distance}));
      const weekVelocityRunning = weekSessions.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / weekSessionsRunningNumber;
      const weekTimeRunning = weekSessions.reduce(
        (a, b) => ({
          duration: {
            hours: a.duration.hours + b.duration.hours,
            minutes: a.duration.minutes + b.duration.minutes,
            seconds: a.duration.seconds + b.duration.seconds,
          },
        }));

      const monthSessionsRunning = monthSessions.filter(s => s.sport === 'Running');
      const monthSessionsRunningNumber = monthSessionsRunning.length;
      const monthDistanceRunning = monthSessions.reduce((a, b) => ({distance: a.distance + b.distance}));
      const monthVelocityRunning = monthSessions.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / monthSessionsRunningNumber;
      const monthTimeRunning = monthSessions.reduce(
        (a, b) => ({
          duration: {
            hours: a.duration.hours + b.duration.hours,
            minutes: a.duration.minutes + b.duration.minutes,
            seconds: a.duration.seconds + b.duration.seconds,
          },
        }));

      const yearSessionsRunning = yearSessions.filter(s => s.sport === 'Running');
      const yearSessionsRunningNumber = yearSessionsRunning.length;
      const yearDistanceRunning = yearSessions.reduce((a, b) => ({distance: a.distance + b.distance}));
      const yearVelocityRunning = yearSessions.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / yearSessionsRunningNumber;
      const yearTimeRunning = yearSessions.reduce(
        (a, b) => ({
          duration: {
            hours: a.duration.hours + b.duration.hours,
            minutes: a.duration.minutes + b.duration.minutes,
            seconds: a.duration.seconds + b.duration.seconds,
          },
        }));

      console.log('week sessions: ' + weekSessionsRunningNumber);
      console.log('distance: ' + weekDistanceRunning.distance);
      console.log('velocity: ' + weekVelocityRunning);
      console.log('week time: ' + weekTimeRunning.duration.hours + ' ' + weekTimeRunning.duration.minutes + ' ' + weekTimeRunning.duration.seconds);

      console.log('month sessions: ' + monthSessionsRunningNumber);
      console.log('distance: ' + monthDistanceRunning.distance);
      console.log('velocity: ' + monthVelocityRunning);
      console.log('month time: ' + monthTimeRunning.duration.hours + ' ' + monthTimeRunning.duration.minutes + ' ' + monthTimeRunning.duration.seconds);

      console.log('year sessions: ' + yearSessionsRunningNumber);
      console.log('distance: ' + yearDistanceRunning.distance);
      console.log('velocity: ' + yearVelocityRunning);
      console.log('year time: ' + yearTimeRunning.duration.hours + ' ' + yearTimeRunning.duration.minutes + ' ' + yearTimeRunning.duration.seconds);


      res.send({valid: validSessions.length, week: weekSessions.length, month: monthSessions.length, year: yearSessions.length});
    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));
};
