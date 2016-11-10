import addSportSession from './addSportSession';
import finishSportSession from './finishSportSession';

export default (app) => {
  addSportSession(app);
  finishSportSession(app);
};
