import {SportSession} from '../db';
import {asyncRequest} from '../util';
// import {thinky} from '../db/thinky';

// calculate time in format hours, minutes, seconds
const calculateTimeBetween = (secondsEndTime, secondsStartTime) => {
  let time = secondsEndTime - secondsStartTime;
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  return {hours, minutes, seconds};
};

export default (app) => {
  app.post('/api/sportSession/:id', asyncRequest(async (req, res) => {
    const sportSession = await SportSession.get(req.params.id);

    sportSession.endTime = new Date(req.body.finishDate);
    sportSession.distance = Number(req.body.totalDistance);

    const secondsEndTime = (sportSession.endTime.getHours() * 3600) + (sportSession.endTime.getMinutes() * 60) + sportSession.endTime.getSeconds();
    const secondsStartTime = (sportSession.startTime.getHours() * 3600) + (sportSession.startTime.getMinutes() * 60) + sportSession.startTime.getSeconds();
    const time = calculateTimeBetween(secondsEndTime, secondsStartTime);

    sportSession.duration.hours = time.hours;
    sportSession.duration.minutes = time.minutes;
    sportSession.duration.seconds = time.seconds;

    try {
      await sportSession.save();
    } catch (e) {
      res.status(400).send({error: e.toString()});
      return;
    }
    res.send(sportSession);
  }));
};
