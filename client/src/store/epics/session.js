import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const startSession = action$ => action$
  .ofType(ActionTypes.START_SESSION)
  .switchMap(({payload}) => Observable
    .ajax.post('http://localhost:8080/api/sportSession', payload)
    .map(res => res.response)
    .mergeMap(() => Observable.of({
      type: ActionTypes.START_SESSION_SUCCESS,
    },
    Actions.addNotificationAction(
      {text: 'Session started', alertType: 'info'}),
    ))
    .catch(error => Observable.of({
      type: ActionTypes.START_SESSION_ERROR,
      payload: {error},
    })),
  );
