import {login, register, logout, updateProfile} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession} from './session';
import {createExercise, getExercises, createRoutine} from './routine';

export default [
  // auth
  login,
  register,
  updateProfile,
  logout,
  addNotification,
  startSession,
  finishSession,
  createExercise,
  getExercises,
  createRoutine,
];
