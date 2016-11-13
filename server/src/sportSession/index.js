import get from './get';
import addSportSession from './addSportSession';
import finishSportSession from './finishSportSession';

export default (app) => {
  get(app);
  addSportSession(app);
  finishSportSession(app);
};
