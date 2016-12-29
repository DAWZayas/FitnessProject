import addExercise from './addExercise';
import get from './get';


export default (app) => {
  get(app);
  addExercise(app);
};
