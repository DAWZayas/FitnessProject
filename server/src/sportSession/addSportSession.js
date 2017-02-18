import {asyncRequest} from '../util';
import {SportSession} from '../db';

export default (app) => {
  app.post('/api/sportSession', asyncRequest(async (req, res) => {
    // get user input
    const {user, sport, startDate} = req.body;
    let {pos} = req.body;
    // save new user
    if (pos === 'undefined') {
      pos = '{}';
    }
    const sportSession = new SportSession({
      user,
      sport,
      startTime: new Date(startDate),
      duration: {},
      pos: JSON.parse(pos),
    });
    const {id} = await sportSession.save();
    res.send({id});
  }));
};
