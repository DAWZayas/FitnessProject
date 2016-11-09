import {asyncRequest} from '../util';
import {Sport} from '../db';

export default (app) => {
  app.post('/api/sport', asyncRequest(async (req, res) => {
    // get user input
    const {name, description} = req.body;
    // save new user
    const sport = new Sport({
      name,
      description,
    });
    await sport.save();

    res.sendStatus(201);
  }));
};
