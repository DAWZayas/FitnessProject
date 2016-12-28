import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const startSession = action$ => action$
  .ofType(ActionTypes.START_SESSION)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/sportSession', payload)
    .map(res => res.response)
    .mergeMap(id => Observable.of({
      type: ActionTypes.START_SESSION_SUCCESS,
      payload: id,
    },
    Actions.addNotificationAction(
      {text: 'Session started', alertType: 'info'}),
    ))
    .catch(error => Observable.of({
      type: ActionTypes.START_SESSION_ERROR,
      payload: {error},
    })),
  );

export const finishSession = action$ => action$
      .ofType(ActionTypes.FINISH_SESSION)
      .switchMap(({payload}) => Observable
        .ajax.post(`http://localhost:8080/api/sportSession/${payload.sessionId}`)
        .map(res => res.response)
        .mergeMap(session => Observable.of({
          type: ActionTypes.FINISH_SESSION_SUCCESS,
          payload: session,
        },
        Actions.addNotificationAction(
          {text: 'Session finished', alertType: 'info'}),
        ))
        .catch(error => Observable.of({
          type: ActionTypes.FINISH_SESSION_ERROR,
          payload: {error},
        })),
      );
