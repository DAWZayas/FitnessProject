import {asyncRequest} from '../util';
import {SportSession} from '../db';

export default (app) => {
  app.post('/api/sportSession', asyncRequest(async (req, res) => {
    // get user input
    const {user, sport, startDate} = req.body;
    // save new user
    const sportSession = new SportSession({
      user,
      sport,
      startTime: new Date(startDate),
      duration: {},
    });
    const {id} = await sportSession.save();
    res.send({id});
  }));
};
