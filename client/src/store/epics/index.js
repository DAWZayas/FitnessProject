import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession} from './session';
import {createExercise} from './routine';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  startSession,
  finishSession,
  createExercise,
];
