import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const createExercise = action$ => action$
  .ofType(ActionTypes.CREATE_EXERCISE)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/exercise', payload)
    .map(res => res.response)
    .mergeMap(() => Observable.of({
      type: ActionTypes.CREATE_EXERCISE_SUCCESS,
    },
    Actions.addNotificationAction(
      {text: 'Exercise created', alertType: 'info'}),
    ))
    .catch(error => Observable.of({
      type: ActionTypes.CREATE_EXERCISE_ERROR,
      payload: {error},
    })),
  );

export const getExercises = action$ => action$
    .ofType(ActionTypes.GET_EXERCISES)
    .switchMap(({headers}) => Observable
      .ajax.get('http://localhost:8080/api/exercise', headers)
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
      )),
    );

export const createRoutine = action$ => action$
    .ofType(ActionTypes.CREATE_ROUTINE)
    .switchMap(({payload}) => Observable
      .ajax.post('http://localhost:8080/api/routine', payload)
      .map(res => res.response)
      .mergeMap(() => Observable.of({
        type: ActionTypes.CREATE_ROUTINE_SUCCESS,
      },
      Actions.addNotificationAction(
        {text: 'Routine created', alertType: 'info'}),
      ))
      .catch(error => Observable.of({
        type: ActionTypes.CREATE_EXERCISE_ERROR,
        payload: {error},
      })),
    );

export const getAllRoutines = action$ => action$
    .ofType(ActionTypes.GET_ALL_ROUTINES)
    .switchMap(({headers}) => Observable
      .ajax.get('http://localhost:8080/api/routine', headers)
      .map(res => res.response)
      .map(routines => ({
        type: ActionTypes.GET_ALL_ROUTINES_SUCCESS,
        payload: {routines},
      }))
      .catch(error => Observable.of({
        type: ActionTypes.GET_ALL_ROUTINES_ERROR,
        payload: {error},
      })),
    );
