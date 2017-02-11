import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {server as serverConfig} from '../../../config';

export const createExercise = action$ => action$
  .ofType(ActionTypes.CREATE_EXERCISE)
  .switchMap(({payload}) => Observable
    .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/exercise`, payload)
    .map(res => res.response)
    .mergeMap(exercise => Observable.of({
      type: ActionTypes.CREATE_EXERCISE_SUCCESS,
      payload: exercise,
    },
    Actions.addNotificationAction(
      {text: 'Exercise created', alertType: 'info'}),
    ))
    .catch(error => Observable.of({
      type: ActionTypes.CREATE_EXERCISE_ERROR,
      payload: {error},
    },
    Actions.addNotificationAction(
      {text: error.xhr.response.error, alertType: 'danger'}),
    ))
  );

export const getExercises = action$ => action$
    .ofType(ActionTypes.GET_EXERCISES)
    .switchMap(({headers}) => Observable
      .ajax.get(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/exercise`, headers)
      .map(res => res.response)
      .map(exercises => ({
        type: ActionTypes.GET_EXERCISES_SUCCESS,
        payload: {exercises},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.GET_EXERCISES_ERROR,
          payload: {error},
        },
        Actions.addNotificationAction(
          {text: error.xhr.response.error, alertType: 'danger'}),
        ))
    );

export const createRoutine = action$ => action$
    .ofType(ActionTypes.CREATE_ROUTINE)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/routine`, payload)
      .map(res => res.response)
      .mergeMap(routine => Observable.of({
        type: ActionTypes.CREATE_ROUTINE_SUCCESS,
        payload: routine,
      },
      Actions.addNotificationAction(
        {text: 'Routine created', alertType: 'info'}),
      ))
      .catch(error => Observable.of({
        type: ActionTypes.CREATE_ROUTINE_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: error.xhr.response.error, alertType: 'danger'}),
      )),
    );

export const getAllRoutines = action$ => action$
    .ofType(ActionTypes.GET_ALL_ROUTINES)
    .mergeMap(({headers, payload}) => Observable
      .ajax.get(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/routine?skip=${payload.skip || 0}&limit=${payload.limit || 6}`, headers)
      .map(res => res.response)
      .map(routines => ({
        type: ActionTypes.GET_ALL_ROUTINES_SUCCESS,
        payload: {routines},
      }))
      .catch(error => Observable.of({
        type: ActionTypes.GET_ALL_ROUTINES_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: error.xhr.response.error, alertType: 'danger'}),
      ))
    );

export const finishRoutine = action$ => action$
    .ofType(ActionTypes.FINISH_ROUTINE)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/routine/finish`, payload)
      .map(res => res.response)
      .mergeMap(routine => Observable.of({
        type: ActionTypes.FINISH_ROUTINE_SUCCESS,
        payload: routine,
      },
      Actions.addNotificationAction(
        {text: 'Routine finished', alertType: 'info'}),
      ))
      .catch(error => Observable.of({
        type: ActionTypes.FINISH_ROUTINE_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: error.xhr.response.error, alertType: 'danger'}),
      )),
    );
