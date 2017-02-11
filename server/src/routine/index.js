import addRoutine from './addRoutine';
import get from './get';
import finishRoutine from './finishRoutine';


export default (app) => {
  get(app);
  addRoutine(app);
  finishRoutine(app);
};
