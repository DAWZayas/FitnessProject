import {asyncRequest} from '../util';
import {SportSession} from '../db';

export default (app) => {
  app.post('/api/sportSession', asyncRequest(async (req, res) => {
    // get user input
    const {user, sport} = req.body;
    // save new user
    const sportSession = new SportSession({
      user,
      sport,
    });
    await sportSession.save();

    res.sendStatus(201);
  }));
};
