import {SportSession} from '../db';
import {asyncRequest} from '../util';
// import {thinky} from '../db/thinky';

export default (app) => {
  app.post('/api/sportSession/updatePosition/:id', asyncRequest(async (req, res) => {
    const sportSession = await SportSession.get(req.params.id);

    const pos = JSON.parse(req.body.pos);

    console.log('>>>>>>>>>>>>>>' + 'lat: ' + pos.lat + ' lng: ' + pos.lng);

    sportSession.pos.lat = pos.lat;
    sportSession.pos.lng = pos.lng;

    try {
      await sportSession.save();
    } catch (e) {
      res.status(400).send({error: e.toString()});
      return;
    }
    res.send(sportSession);
  }));
};
