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
