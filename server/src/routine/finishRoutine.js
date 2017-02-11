import {asyncRequest} from '../util';
import {SportSession} from '../db';

export default (app) => {
  app.post('/api/routine/finish', asyncRequest(async (req, res) => {
    // get user input
    const {user, sport, finishDate, exercises, rounds} = req.body;
    // save new user
    const dur = JSON.parse(exercises).reduce((a, b) => ({time: a.time + b.time})).time * rounds;
    const duration = {};
    duration.hours = Math.floor(dur / 3600);
    duration.minutes = Math.floor((dur % 3600) / 60);
    duration.seconds = dur % 60;
    const sportSession = new SportSession({
      user,
      sport,
      endTime: new Date(finishDate),
      exercises: JSON.parse(exercises),
      duration,
      rounds,
    });
    await sportSession.save();
    res.send(sportSession);
  }));
};
