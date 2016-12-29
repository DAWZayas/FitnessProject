import addRoutine from './addRoutine';
import get from './get';


export default (app) => {
  get(app);
  addRoutine(app);
};
