import {thinky} from './thinky';

export const User = thinky.createModel('User', {
  login: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(thinky.r.now()),
  name: thinky.type.string().required(),
  surname: thinky.type.string().required(),
  mail: thinky.type.string().required(),
  country: thinky.type.string().required(),
  weight: thinky.type.string().required(),
  height: thinky.type.string().required(),

});
