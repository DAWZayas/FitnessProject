import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession} from './session';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  startSession,
  finishSession,
];
