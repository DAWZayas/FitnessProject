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
  app.get('/api/stats/:id', asyncRequest(async (req, res) => {
    try {
      const user = await User.get(req.params.id)
        .without(['password'])
        .execute();
      const actualDate = new Date("Sat Jan 28 2017 16:33:44 GMT+00:00");
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

      res.send({valid: validSessions.length, week: weekSessions.length, month: monthSessions.length, year: yearSessions.length});
    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));
};
