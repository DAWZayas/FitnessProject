import {thinky} from './thinky';

export const User = thinky.createModel('User', {
  login: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(thinky.r.now()),
  name: thinky.type.string(),
  surname: thinky.type.string(),
  mail: thinky.type.string(),
  country: thinky.type.string(),
  weight: thinky.type.string(),
  height: thinky.type.string(),

});
