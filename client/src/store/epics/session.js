import {Observable} from 'rxjs/Observable';
import Rx from 'rxjs/Rx';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {server as serverConfig} from '../../../config';

export const startSession = action$ => action$
  .ofType(ActionTypes.START_SESSION)
  .switchMap(({payload}) => Observable
    .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/sportSession`, payload)
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
        .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/sportSession/${payload.sessionId}`, payload)
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

export const updateSessionPosition = action$ => action$
        .ofType(ActionTypes.UPDATE_SESSION_POSITION)
        .switchMap(({payload}) => Observable
          .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/sportSession/updatePosition/${payload.sessionId}`, payload)
          .map(res => res.response)
          .mergeMap(session => Observable.of({
            type: ActionTypes.UPDATE_SESSION_POSITION_SUCCESS,
            payload: session,
          }
          ))
        );

export const prepareSession = action$ => action$
      .ofType(ActionTypes.PREPARE_SESSION)
      .mergeMap(() => Rx.Observable.create(subscriber =>
        navigator.geolocation.getCurrentPosition(position => subscriber.next(position))
      ))
      .mergeMap(position => Observable.of(
        {
          type: ActionTypes.PREPARE_SESSION_SUCCESS,
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        },
        Actions.addNotificationAction({text: 'Session prepared', alertType: 'info'}),
      ));
