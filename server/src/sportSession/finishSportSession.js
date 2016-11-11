import {SportSession} from '../db';
import {asyncRequest} from '../util';
import {thinky} from '../db/thinky';

export default (app) => {
  app.post('/api/sportSession/:id', asyncRequest(async (req, res) => {
    const sportSession = await SportSession.get(req.params.id);
    sportSession.endTime = new Date();
    const secondsEndTime = sportSession.endTime.getHours() * 3600 + sportSession.endTime.getMinutes() * 60 + sportSession.endTime.getSeconds();
    const secondsStartTime = sportSession.startTime.getHours() * 3600 + sportSession.startTime.getMinutes() * 60 + sportSession.startTime.getSeconds();
    console.log(secondsEndTime, secondsStartTime);
    try {
      await sportSession.save();
    } catch (e) {
      res.status(400).send({error: e.toString()});
      return;
    }
    res.send(sportSession);
  }));
};
