import {asyncRequest} from '../util';
import {Routine} from '../db';

export default (app) => {
  app.post('/api/routine', asyncRequest(async (req, res) => {
    const {user, name, level, rest, rounds, restRounds, exercises} = req.body;
    const routine = new Routine({
      user,
      name,
      level,
      rest,
      rounds,
      restRounds,
      exercises: JSON.parse(exercises),
    });
    await routine.save();

    res.sendStatus(201);
  }));
};