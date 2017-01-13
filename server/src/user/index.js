// our packages
import get from './get';
import update from './update';
import updateProfile from './updateProfile';


export default (app) => {
  get(app);
  update(app);
  updateProfile(app);
};
