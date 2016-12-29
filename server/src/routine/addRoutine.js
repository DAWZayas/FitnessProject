import {asyncRequest} from '../util';
import {Routine} from '../db';

export default (app) => {
  app.post('/api/routine', asyncRequest(async (req, res) => {
    const {user, name, level, rest, rounds, restRounds, exercises} = req.body;
    const sport = new Routine({
      user,
      name,
      level,
      rest,
      rounds,
      restRounds,
      exercises: exercises.map(exercise => JSON.parse(exercise)),
    });
    await sport.save();

    res.sendStatus(201);
  }));
};
