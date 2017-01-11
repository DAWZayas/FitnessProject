import {login, register, logout, updateProfile} from './auth';
import {addNotification} from './notifications';
import {startSession, finishSession, prepareSession} from './session';
import {createExercise, getExercises, createRoutine, getAllRoutines} from './routine';

export default [
  // auth
  login,
  register,
  updateProfile,
  logout,
  addNotification,
  prepareSession,
  startSession,
  finishSession,
  createExercise,
  getExercises,
  createRoutine,
  getAllRoutines,
];
