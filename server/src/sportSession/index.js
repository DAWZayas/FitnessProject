import get from './get';
import addSportSession from './addSportSession';
import finishSportSession from './finishSportSession';
import updateSessionPosition from './updateSessionPosition';

export default (app) => {
  get(app);
  addSportSession(app);
  finishSportSession(app);
  updateSessionPosition(app);
};
